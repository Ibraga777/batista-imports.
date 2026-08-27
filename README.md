# Batista Imports

Site one-page da loja Batista Imports — moda masculina premium, Gravataí-RS.

## Estrutura
- `index.html` — site completo (HTML + CSS + JS em um único arquivo)
- `images/` — logo e fotos dos produtos

## Como publicar no GitHub Pages
1. Crie um repositório novo no GitHub (ex: `batista-imports`)
2. Suba estes arquivos (`index.html` e a pasta `images/`) para a raiz do repositório
3. Vá em **Settings → Pages**
4. Em "Source", selecione a branch `main` e a pasta `/ (root)`
5. Salve — em alguns minutos o site estará no ar em `https://SEU-USUARIO.github.io/batista-imports/`

## Atualizar produtos
Abra `index.html`, procure `const produtos = [...]` perto do final do arquivo.
Cada item segue este formato:

```js
{
  nome: "Nome da peça",
  categoria: "Camisetas", // Camisetas, Camisas, Bermudas, Moletons, Jaquetas, Conjuntos, Novidades
  preco: 199.90,
  precoAntigo: 239.90, // opcional, mostra "de/por"
  imagem: "images/arquivo.jpeg",
  destaque: true // aparece na seção "Em Destaque"
}
```

Para trocar uma foto, basta substituir o arquivo dentro de `images/` mantendo o mesmo nome, ou apontar `imagem` para um novo arquivo.

## Pendências
- Preços atuais são placeholders — confirmar valores reais de cada peça.
