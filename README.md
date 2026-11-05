# Jhony Barber | Barbearia & Cuidado Masculino (Versão v9 — v7 + melhorias da v8)

Landing page institucional completa com equipe de barbeiros (2x2), pasta de imagens e painel administrativo (`admin.html`).
Esta versão usa a **v7 como base** e incorpora a melhor ideia da v8: **gerar o .ZIP atualizado direto do navegador**.

## Como atualizar o site
1. Abra `admin.html` e entre com a senha.
2. Edite barbeiros, fotos, serviços e textos.
3. Clique em **"Salvar e Gerar .ZIP Completo Atualizado"**.
4. Descompacte o ZIP baixado e substitua os arquivos no seu projeto / GitHub.

O ZIP contém `dados.js` atualizado, as fotos enviadas já convertidas em arquivos dentro de `imagens/` e os demais arquivos do site.
> Se o painel for aberto direto do computador (endereço `file://`), o navegador não deixa copiar os outros arquivos: nesse caso o ZIP traz só `dados.js` + `imagens/` (o `LEIA-ME_ATUALIZACAO.txt` dentro do ZIP explica). Basta copiá-los para a pasta do site.

## Estrutura do Projeto
- `index.html`: Landing page para os clientes.
- `admin.html`: Painel administrativo (fotos, textos, preços, backup e geração do ZIP).
- `style.css`: Estilização premium em grid escuro e dourado.
- `dados.js`: **Dados padrão do site** (textos, equipe, serviços). É o arquivo que o painel atualiza. Precisa ficar junto do `script.js`.
- `script.js`: Lógica da página e do painel (renderização, compressão de imagens, geração do ZIP).
- `imagens/`: Fotos locais dos barbeiros (ex.: `imagens/barbeiro1.jpg`).

## Observação
Ao publicar, envie **todos** os arquivos (incluindo `dados.js`). Sem ele o site mostra um aviso de erro no topo.
