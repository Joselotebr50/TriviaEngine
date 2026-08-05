# Trivia Engine

Jogo de perguntas e respostas (trivia) client-side, sem backend — roda direto no navegador (GitHub Pages).

## Estrutura

```
index.html              # tela do jogo
admin/                  # painel administrativo (categorias e perguntas)
assets/css/style.css    # estilos
assets/images/          # imagens (vazio por enquanto)
assets/sounds/          # sons (vazio por enquanto)
src/core/Engine.js      # motor do jogo (pontuação, vidas, cronômetro, eventos)
src/ui/UI.js            # renderização das telas
src/services/Storage.js # persistência (localStorage): categorias, ranking, progresso
src/data/Questions.js   # perguntas padrão
manifest.json / sw.js   # suporte a PWA (instalável, funciona offline)
```

## Como funciona

- As perguntas padrão ficam em `src/data/Questions.js`.
- O painel em `/admin` permite criar novas categorias e perguntas, salvas no `localStorage` do navegador (por enquanto local ao dispositivo — sem sincronização entre usuários).
- O ranking e o progresso do jogador também ficam salvos no `localStorage`.

## Rodando localmente

Como o projeto usa ES Modules, precisa de um servidor local (não abrir o `index.html` direto com `file://`):

```bash
npx serve .
```

## Painel admin

Acesse `/admin` — pede uma senha antes de liberar o acesso.

- **Senha padrão:** `trivia2026` (troque assim que possível)
- Para trocar a senha: gere o hash SHA-256 da nova senha e substitua a constante
  `HASH_SENHA` no início de `admin/admin.js`. Exemplo (Node.js):
  ```js
  require("crypto").createHash("sha256").update("sua-nova-senha").digest("hex")
  ```
- **Atenção:** por ser um site estático (sem servidor), essa senha só impede acesso
  casual — alguém com conhecimento técnico pode ler o código-fonte e contornar.
  Não é adequado para dados sensíveis.

## Próximos passos sugeridos

- Adicionar imagens/sons em `assets/`
- Editar/remover perguntas customizadas no admin (hoje só é possível adicionar)
- Ícones do PWA em `manifest.json`
