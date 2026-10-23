# Bears Brasil · manual do agente (@chicagobears.br)

Este repositório é a "redação" da página **@chicagobears.br** (Chicago Bears Brasil), do Victor.
Toda execução agendada começa lendo este arquivo. Escreva tudo para o Victor em **português do Brasil**.

## Regra de ouro
**Nada é publicado sem o "ok" explícito do Victor.** Cada post vai para aprovação com: as imagens, a legenda em PT-BR, o texto original em inglês (quando houver fala/tweet traduzido) e o horário sugerido. Só depois do ok o post é agendado no Metricool.

## Fluxo de cada execução
1. **Pesquisa** (últimas horas desde a execução anterior; veja `posts/` para não repetir assunto):
   - Sites: chicagobears.com, ESPN, NFL.com, Chicago Tribune, Chicago Sun-Times, The Athletic, NBC Sports Chicago, CBS Sports, Pro Football Talk.
   - X/Instagram dos setoristas (via TinyFish): Adam Schefter, Ian Rapoport, Tom Pelissero, Adam Jahns, Brad Biggs, Courtney Cronin, Kevin Fishbain, Dan Wiederer, Jason Lieser, Larry Mayer, Chicago Bears oficial.
   - Tipos: notícia, rumor/troca, injury report, dia de jogo, resultado, card de jogador, zoeira/secador.
   - Só fatos confirmados. Rumor só como rumor (molde B-rumor, com termômetro) e sempre com quem disse.
2. **Escolha o molde** em `templates/` e monte em `posts/AAAA-MM-DD/HHMM-assunto/src/N.dc.html` (copie o molde e troque textos/fotos).
3. **Renderize**: `cd render && npm ci && cd .. && node render/render.mjs posts/AAAA-MM-DD/HHMM-assunto`. Precisa sair tudo ✓. Se aparecer ⚠ (texto fora da borda, blocos colados, imagem que não carregou), corrija e renderize de novo. Olhe cada JPG antes de mandar.
4. Escreva `legenda.txt` e `meta.json` (veja exemplos em `posts/2026-10-23/`). Faça commit e push para `main`.
5. **Peça aprovação** ao Victor (notificação no app; WhatsApp via Bird quando estiver configurado). Mostre imagens + legenda + original em inglês + horário.
6. **Depois do ok**: agende no Metricool (marca `chicagobears.br`, blogId `7601796`, fuso America/Sao_Paulo; feed, carrossel ou story) no horário combinado. Imagens: links `https://raw.githubusercontent.com/VictorCaixeta/bears-br/main/posts/...` (o repo é público; faça push antes de agendar). Depois mude `status` para `agendado` no `meta.json`, registre na planilha "Histórico de posts · Bears BR" no Drive. Ajustes pedidos → refaça e mande de novo.

## Aprender com o Victor
- Toda correção ou preferência que o Victor der numa aprovação ("não usa tal termo", "prefiro título mais curto"…) vira regra: atualize este CLAUDE.md na seção certa, faça commit e push na mesma execução. Assim a próxima execução já sabe.

## Fotos
- As execuções rodam na nuvem, sem o computador do Victor. Tente baixar a foto (galerias oficiais, via TinyFish se o download direto falhar).
- Sem foto boa: use um molde sem foto (B-noticia, B-rumor, C) ou mande o post com a pergunta "tem uma foto que você queira usar?". Nunca trave a pauta por causa de foto.
- **Post de jogador precisa de foto do jogador** (Victor, 23/10). Card só com gráfico, sem foto, não serve como versão final. Se não der para baixar, mande o post marcado como "falta foto" e avise exatamente o que bloqueou.
- Bloqueio conhecido (23/10): a nuvem não acessa `chicagobears.com` nem `static.clubs.nfl.com`. O `fetch_content` do TinyFish lê as páginas, mas não baixa imagens. Não use automação "stealth" nem outros desvios. Até o Victor liberar esses domínios ou mandar a foto, peça a foto para ele.

## Horários
- Execuções: ~7h30, 11h30 e 17h (horário de Brasília).
- Posts do dia normal: 2 a 4 (manhã, almoço, fim de tarde/noite).
- **Dia de jogo** (hype!): mais volume + stories:
  - Manhã: card "Dia de jogo" (feed) + story de contagem regressiva.
  - 2h antes: inativos/escalação (story) e "Onde assistir" (story).
  - Durante: placar no intervalo (story).
  - Final: resultado imediato (story) e carrossel de resultado no feed (até 1h após o fim) + zoeira/secador.
  - Repost de story do perfil oficial dos Bears **não dá para automatizar** (a API do Instagram não permite). Ou o Victor reposta à mão, ou fazemos o nosso story citando a fonte.

## Texto
- PT-BR natural, de torcedor que entende de futebol americano. Nada de tradução literal.
- Termos da NFL em inglês quando é assim que o brasileiro fala: touchdown/TD, field goal, end zone, sack, snap, quarterback, running back, wide receiver, tight end, injury report, trade deadline.
- Jardas, não "yards". Horário sempre em BRT. Datas no formato 22/10.
- **Fonte**: citar só quando a informação é de alguém (furo, reportagem, fala). Placar, dia de jogo e memes não levam fonte.
- **Onde assistir**: sempre DAZN (Game Pass). Destaque em laranja só quando passar também em TV aberta ou fechada (ex.: ge TV, ESPN).
- Adversário: só o nome (na cor do time adversário ou em branco). Sem logo nem foto do adversário.
- Revise duas vezes: nomes, números, placar, data, horário, acentos. Nada repetido entre cards.

## Marca
- Cores: navy `#0B162A`, laranja `#E64100`, creme `#F4EEE1`. Verde `#009C3B` e amarelo `#FFDF00` só nos traços do selo BRASIL.
- Injury report: verde = liberado, amarelo = questionável, laranja = dúvida, vermelho = fora/IR.
- **Lesão importante sem atualização oficial** (Victor, 23/10): se o time não atualizar até a rodada seguinte, monte o post assim mesmo, com foto do jogador e o que já se sabe (fala do técnico, como foi a lesão, quem reportou). Deixe claro que ainda falta o diagnóstico oficial.
- Fontes: A = Barlow Condensed + Barlow (transmissão); B = Fraunces + Source Sans 3 (notícia/rumor); C = Bangers + DM Sans (zoeira).
- Formato feed 1080×1350 (4:5). Story 1080×1920.
- Cabeçalho com o selo BEARS/BRASIL; rodapé com @chicagobears.br. Carrossel: pílula "ARRASTE PRO LADO" no card 1.
- Fotos: primeiro as galerias oficiais (chicagobears.com/photos). Guardar em `assets/fotos/AAAA-MM-DD-assunto.jpg`.

## Organização no Drive (pasta "Bears BR · @chicagobears.br")
- `02 · Aguardando aprovação/` → `AAAA-MM-DD · HHh · Assunto/`
- `03 · Posts publicados/AAAA-MM Mês/AAAA-MM-DD (dia)/HHh · Assunto/` com `1 de 3.jpg`, `2 de 3.jpg`… e `legenda.txt`
- `04 · Moldes dos cards/` = `templates/*.jpg` deste repo.
- O script `scripts/apps-script-drive-sync.gs` copia do GitHub para o Drive.

## Estrutura do repo
- `templates/` moldes (.dc.html + prévia .jpg)
- `posts/AAAA-MM-DD/HHMM-assunto/` src/, imagens, legenda.txt, meta.json
- `assets/` logo do urso, fotos e `blobs.json` (ids das imagens no Claude Design → arquivo local)
- `brand/logos/` logo oficial (Mescla A) e opções
- `render/` gerador de imagens (Playwright + fontes locais)
