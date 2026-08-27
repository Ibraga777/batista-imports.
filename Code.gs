/**
 * Batista Imports — Backend (Google Apps Script)
 * Recebe pedidos do site, grava na aba PEDIDOS, baixa estoque na aba PRODUTOS
 * e devolve o link de pagamento.
 *
 * Abas esperadas na mesma planilha:
 *  - PRODUTOS (cabeçalho na LINHA 2): id | nome | categoria | preco | precoAntigo | estoque | destaque | ativo | imagem | linkPagamento | obs
 *  - CONFIG   (cabeçalho na LINHA 1): whatsapp | linkPagamentoPadrao | pixChave | fretePadrao | cidadeOrigem | ufOrigem
 *  - PEDIDOS  (cabeçalho na LINHA 2): idPedido | dataHora | produtoId | produtoNome | preco | qtd | total | nomeCliente | whatsappCliente | cep | endereco | numero | complemento | bairro | cidade | uf | status | obs
 */

const ABA_PRODUTOS = "PRODUTOS";
const ABA_CONFIG = "CONFIG";
const ABA_PEDIDOS = "PEDIDOS";
const LINHA_CABECALHO_PRODUTOS = 2;
const LINHA_CABECALHO_PEDIDOS = 2;
const LINHA_CABECALHO_CONFIG = 1;
const TIMEZONE = "America/Sao_Paulo";

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, servico: "Batista Imports API" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000); // até 15s esperando outra requisição terminar

  try {
    const dados = JSON.parse(e.postData.contents);

    if (!dados.produtoId || !dados.qtd || dados.qtd < 1) {
      return jsonResponse({ ok: false, erro: "dados_invalidos" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const shProdutos = ss.getSheetByName(ABA_PRODUTOS);
    const shPedidos = ss.getSheetByName(ABA_PEDIDOS);
    const shConfig = ss.getSheetByName(ABA_CONFIG);

    // --- Localiza o produto e valida estoque ---
    const produtosData = shProdutos.getDataRange().getValues();
    const headerProdutos = produtosData[LINHA_CABECALHO_PRODUTOS - 1].map(h => String(h).trim().toLowerCase());
    const colId = headerProdutos.indexOf("id");
    const colEstoque = headerProdutos.indexOf("estoque");
    const colLinkPagamento = headerProdutos.indexOf("linkpagamento");
    const colNome = headerProdutos.indexOf("nome");

    let linhaProduto = -1;
    let estoqueAtual = 0;
    let linkPagamentoProduto = "";

    for (let i = LINHA_CABECALHO_PRODUTOS; i < produtosData.length; i++) {
      if (String(produtosData[i][colId]).trim() === String(dados.produtoId).trim()) {
        linhaProduto = i; // índice 0-based no array
        estoqueAtual = Number(produtosData[i][colEstoque]) || 0;
        linkPagamentoProduto = colLinkPagamento > -1 ? String(produtosData[i][colLinkPagamento] || "").trim() : "";
        break;
      }
    }

    if (linhaProduto === -1) {
      return jsonResponse({ ok: false, erro: "produto_nao_encontrado" });
    }

    if (estoqueAtual < dados.qtd) {
      return jsonResponse({ ok: false, erro: "sem_estoque", estoqueDisponivel: estoqueAtual });
    }

    // --- Baixa o estoque ---
    const novoEstoque = estoqueAtual - dados.qtd;
    shProdutos.getRange(linhaProduto + 1, colEstoque + 1).setValue(novoEstoque);

    // --- Pega link de pagamento padrão da CONFIG, se necessário ---
    let linkPagamentoPadrao = "";
    if (shConfig) {
      const configData = shConfig.getDataRange().getValues();
      const headerConfig = configData[LINHA_CABECALHO_CONFIG - 1].map(h => String(h).trim().toLowerCase());
      const colLinkPadrao = headerConfig.indexOf("linkpagamentopadrao");
      if (colLinkPadrao > -1 && configData[LINHA_CABECALHO_CONFIG]) {
        linkPagamentoPadrao = String(configData[LINHA_CABECALHO_CONFIG][colLinkPadrao] || "").trim();
      }
    }

    const paymentUrl = linkPagamentoProduto || linkPagamentoPadrao || "";

    // --- Gera ID do pedido e grava na aba PEDIDOS ---
    const agora = new Date();
    const idPedido = "BI" + Utilities.formatDate(agora, TIMEZONE, "yyMMddHHmmss");
    const dataHoraFormatada = Utilities.formatDate(agora, TIMEZONE, "dd/MM/yyyy HH:mm:ss");

    shPedidos.appendRow([
      idPedido,
      dataHoraFormatada,
      dados.produtoId,
      dados.produtoNome || (colNome > -1 ? produtosData[linhaProduto][colNome] : ""),
      dados.preco || 0,
      dados.qtd,
      dados.total || (dados.preco * dados.qtd),
      dados.nomeCliente || "",
      dados.whatsappCliente || "",
      dados.cep || "",
      dados.endereco || "",
      dados.numero || "",
      dados.complemento || "",
      dados.bairro || "",
      dados.cidade || "",
      dados.uf || "",
      "Novo",
      ""
    ]);

    return jsonResponse({ ok: true, idPedido: idPedido, paymentUrl: paymentUrl });

  } catch (err) {
    return jsonResponse({ ok: false, erro: "erro_interno", detalhe: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
