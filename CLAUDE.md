# Da Bears Brasil · manual do agente (@dabears.brasil)

Este repositório é a "redação" da página **@dabears.brasil** (nome de exibição "Da Bears Brasil | Chicago Bears"; antes era @chicagobears.br, trocado em 23/10 para não confundir com o @chicagobearsbrasil, que já existe), do Victor.
Toda execução agendada começa lendo este arquivo. Escreva tudo para o Victor em **português do Brasil**.

## Regra de ouro
**Nada é publicado sem o "ok" explícito do Victor.** Cada post vai para aprovação com: as imagens, a legenda em PT-BR, o texto original em inglês (quando houver fala/tweet traduzido) e o horário sugerido. Só depois do ok o post é agendado no Metricool.

## Fluxo de cada execução
1. **Pesquisa** (últimas horas desde a execução anterior; veja `posts/` para não repetir assunto):
   - Sites: chicagobears.com, ESPN, NFL.com, Chicago Tribune, Chicago Sun-Times, The Athletic, NBC Sports Chicago, CBS Sports, Pro Football Talk.
   - X/Instagram dos setoristas (via TinyFish): Adam Schefter, Ian Rapoport, Tom Pelissero, Adam Jahns, Brad Biggs, Courtney Cronin, Kevin Fishbain, Dan Wiederer, Jason Lieser, Larry Mayer, Chicago Bears oficial.
   - Tipos: notícia, rumor/troca, injury report, dia de jogo, resultado, card de jogador, zoeira/secador.
   - **Assunto já publicado não volta ao feed** (Victor, 23/10): antes de propor post, confira no Metricool o que já foi PUBLICADO. Se um furo/rumor já foi postado e depois só se confirma (ex.: Kmet fora da temporada), não faça post novo de feed.
   - Só fatos confirmados. Rumor só como rumor (molde B-rumor, com termômetro) e sempre com quem disse.
2. **Escolha o molde** em `templates/` e monte em `posts/AAAA-MM-DD/HHMM-assunto/src/N.dc.html` (copie o molde e troque textos/fotos).
3. **Renderize**: `cd render && npm ci && cd .. && node render/render.mjs posts/AAAA-MM-DD/HHMM-assunto`. Precisa sair tudo ✓. Se aparecer ⚠ (texto fora da borda, blocos colados, imagem que não carregou), corrija e renderize de novo. Olhe cada JPG antes de mandar.
4. Escreva `legenda.txt` e `meta.json` (com `titulo` curto, ex.: "Cairo Santos redenção", que vira o nome da pasta no Drive; status: aguardando → agendado → publicado, ou descartado) (veja exemplos em `posts/2026-10-23/`). Faça commit e push para `main`.
5. **Peça aprovação** ao Victor (notificação no app; WhatsApp via Bird quando estiver configurado). Mostre imagens + legenda + original em inglês + horário.
6. **Depois do ok**: agende no Metricool (blogId `7601796`, fuso America/Sao_Paulo; feed, carrossel ou story) no horário combinado. Imagens: links `https://raw.githubusercontent.com/VictorCaixeta/bears-br/main/posts/...` (o repo é público; faça push antes de agendar). Depois mude `status` para `agendado` no `meta.json`, registre na planilha "Histórico de posts · Bears BR" no Drive. (Google Sheets conectado; id `19bei9rHFxS7ueoVLLzqdk-iPQsHDwptfLzLsd9BlO0o`, aba `Untitled`; uma linha por post, status "Aprovado" quando agendado.) Ajustes pedidos → refaça e mande de novo.

## Aprender com o Victor
- Toda correção ou preferência que o Victor der numa aprovação ("não usa tal termo", "prefiro título mais curto"…) vira regra: atualize este CLAUDE.md na seção certa, faça commit e push na mesma execução. Assim a próxima execução já sabe.

## Fotos
- As execuções rodam na nuvem, sem o computador do Victor. Tente baixar a foto (galerias oficiais, via TinyFish se o download direto falhar).
- Sem foto boa: use um molde sem foto (B-noticia, B-rumor, C) ou mande o post com a pergunta "tem uma foto que você queira usar?". Nunca trave a pauta por causa de foto.
- **Post de jogador precisa de foto do jogador** (Victor, 23/10). Card só com gráfico, sem foto, não serve como versão final. Se não der para baixar, mande o post marcado como "falta foto" e avise exatamente o que bloqueou.
- Acesso à rede: liberado para todos os domínios (23/10). Fotos da galeria em tamanho cheio: `https://static.clubs.nfl.com/image/upload/bears/<id>.jpg`. Os ids saem do `fetch_content` (image_links) da página da galeria. Foto do perfil do jogador: `chicagobears.com/team/players-roster/<nome>/`, versão grande em `.../image/private/f_auto/bears/<id>.jpg`. Para achar o jogador, monte uma folha de contato e olhe as fotos (as galerias não têm legenda).
- Corte o adversário fora da foto (regra "sem foto do adversário"). Registre cada foto nova em `assets/blobs.json` (md5 → caminho).

## Ideias de pauta (Victor)
- **Carrossel "De olho nos números"** (Victor, 23/10): capa com a ideia geral + 1 dado forte por card, com foto grande do jogador e tarja laranja "DE OLHO NOS NÚMEROS". Bom para dia sem notícia e semana de folga. Ainda não existe molde: criar `templates/A-numeros` na primeira vez. Números conferidos em fonte primária (Pro Football Reference, chicagobears.com, NFL.com), nunca copiados de outra página. Primeiras pautas: Caleb desde a volta da lesão (300+ jardas seguidas; 35 jogos seguidos com 20+ passes e no máx. 1 INT, empatado com Rodgers, conferir), Luther Burden (17 de 17 alvos recebidos), Cairo (FG de 58, recorde do time).
- **Post fixado "Temporada 2026"** (Victor, 23/10): UM card só (1080×1350) com os 17 jogos + a semana de folga, em lista: jogos feitos com V/D (verde/vermelho) e placar, jogos que faltam com data e horário em BRT; record atual em destaque (ex.: 5-2). Toda semana, depois do jogo, sai uma versão nova para aprovação; o Victor fixa a nova e apaga a antiga à mão (o Instagram não deixa trocar imagem de post publicado nem fixar/apagar pela API). Quando existir, criar `templates/A-temporada`. Conferir datas/horários no site oficial (chicagobears.com/schedule ou NFL.com).

## Horários
- Execuções: 7h24, 11h24, 16h24 e 20h24 (horário de Brasília). A das 20h24 cobre o noticiário da tarde nos EUA; post dela sai à noite (21h–22h) e notícia que não for urgente pode ficar para a manhã seguinte.
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
- **Lesão = foto colorida** (Victor, 23/10): nada de preto e branco em post/story de lesão; P&B passa impressão de morte/luto. O tom triste vem do texto e do navy, não da foto.
- Formato feed 1080×1350 (4:5). Story 1080×1920.
- Cabeçalho com o selo BEARS/BRASIL; rodapé com @dabears.brasil. Onde o nome da página aparece escrito no cabeçalho (moldes B, stories), é **"Da Bears Brasil"**, nunca só "Bears Brasil" (Victor, 23/10). Carrossel: pílula "ARRASTE PRO LADO" no card 1.
- Fotos: primeiro as galerias oficiais (chicagobears.com/photos). Guardar em `assets/fotos/AAAA-MM-DD-assunto.jpg`.

## Organização no Drive (pasta "Bears BR · @dabears.brasil")
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
