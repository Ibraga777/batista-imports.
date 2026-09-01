# Deploy — Batista Imports (checkout com planilha)

## Passo a passo (Isaac)
1. Abra a Google Sheet com as abas PRODUTOS, CONFIG e PEDIDOS.
2. Extensões → Apps Script → apague o conteúdo e cole o `Code.gs`.
3. Clique em Implantar → Nova implantação → tipo **App da Web**.
4. Executar como: **Eu**. Quem tem acesso: **Qualquer pessoa**.
5. Copie a URL do Web App gerada.
6. No `index.html`, cole essa URL em `APPS_SCRIPT_URL`.
7. Na planilha: Arquivo → Compartilhar → Publicar na web → escolha a aba **PRODUTOS** → formato **CSV**.
8. Copie a URL do CSV publicado e cole em `SHEET_CSV_URL` no `index.html`.
9. Cole o link de pagamento padrão (Mercado Pago) em `LINK_PAGAMENTO_PADRAO`.
10. Cole o número de WhatsApp da loja (só dígitos, com 55 + DDD) em `WHATSAPP_LOJA`.
11. Suba o `index.html` atualizado no GitHub (substitua o arquivo antigo).
12. Teste uma compra completa no site publicado para confirmar que o pedido cai na aba PEDIDOS e o estoque desconta.

## Texto para mandar no WhatsApp do lojista

Oi! O site já está automático 🙌 Só precisa saber disto:

1. Pra mudar preço ou quantidade em estoque de uma peça, abre a planilha e vai na aba *PRODUTOS*.
2. Muda o número na coluna *preco* ou na coluna *estoque* — o site atualiza sozinho em poucos minutos.
3. Se o estoque estiver *0*, a peça aparece como "Esgotado" no site automaticamente.
4. Pra tirar uma peça do ar sem apagar ela, muda a coluna *ativo* de "sim" pra "nao".
5. *Nunca apague uma linha inteira* — só edite os números, senão o site pode dar erro.
6. Toda venda cai sozinha na aba *PEDIDOS*, já com nome, endereço e WhatsApp do cliente.
7. Pra trocar a foto de um produto: veja o passo a passo abaixo.
8. Qualquer dúvida, me chama que eu ajusto.

## Como adicionar/trocar fotos de produto (sem mexer em código)

As fotos agora podem vir do Google Drive — o lojista sobe a foto lá, pega o link e cola na planilha.

1. Crie (ou use) uma pasta no Google Drive só para as fotos da loja.
2. Suba a foto do produto nessa pasta (pelo site do Drive ou pelo app do celular).
3. Clique com o botão direito na foto → **Compartilhar** → em "Acesso geral" escolha **"Qualquer pessoa com o link"**.
4. Clique em **Copiar link**. Vai ficar parecido com:
   `https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing`
5. Vá na planilha, aba **PRODUTOS**, na linha do produto, coluna **imagem**, e cole esse link inteiro.
6. Pronto — em alguns minutos a foto aparece no site automaticamente. Não precisa mexer no GitHub.

Se preferir, o antigo jeito (arquivo dentro da pasta `images/` do site) continua funcionando — basta colocar
só o nome do arquivo na coluna `imagem` (ex: `polo-nova.jpeg`), mas isso exige subir o arquivo no GitHub.
Pelo Drive não precisa disso.

