# bears-br

Redação da página **@dabears.brasil** (Da Bears Brasil): moldes dos cards, posts por dia e o gerador de imagens.

- Manual do agente e regras da marca: [CLAUDE.md](CLAUDE.md)
- Moldes: `templates/` · Posts: `posts/AAAA-MM-DD/` · Logos: `brand/logos/`
- Gerar imagens: `cd render && npm ci && cd .. && node render/render.mjs posts/2026-10-23`
- Sincronizar com o Google Drive: `scripts/apps-script-drive-sync.gs`
