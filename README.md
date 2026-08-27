# Batista Imports

Site one-page da loja Batista Imports — moda masculina premium, Gravataí-RS — com checkout integrado a Google Sheets.

## Estrutura
- `index.html` — site completo (HTML + CSS + JS em um único arquivo), com catálogo dinâmico (carrega da planilha) e modal de checkout
- `images/` — logo e fotos dos produtos
- `Code.gs` — script do Google Apps Script (backend: grava pedidos, baixa estoque, devolve link de pagamento)
- `DEPLOY.md` — passo a passo de configuração + texto pronto pro lojista

## Como publicar no GitHub Pages
1. Suba estes arquivos (`index.html`, pasta `images/`) para a raiz do repositório
2. Settings → Pages → Source: branch `main`, pasta `/ (root)` → Save
3. Aguarde alguns minutos; o link aparece na própria página de Settings → Pages

## Configuração do checkout (planilha + Apps Script)
Veja o `DEPLOY.md` — resumo: publique a aba PRODUTOS como CSV, implante o `Code.gs` como Web App,
e cole as 3 URLs no topo do `<script>` do `index.html` (SHEET_CSV_URL, APPS_SCRIPT_URL, LINK_PAGAMENTO_PADRAO)
mais o WHATSAPP_LOJA.

## Atualizar produtos no dia a dia
Depois de configurado, **não edite mais o array no código** — mude preço e estoque direto na
aba PRODUTOS da planilha. O array `produtosFallback` no `index.html` só é usado se a planilha falhar.
