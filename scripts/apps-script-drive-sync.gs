/**
 * Da Bears Brasil · sincroniza posts do GitHub para o Google Drive.
 * Instalação (uma vez): script.google.com → Novo projeto → cole este arquivo →
 *   Configurações do projeto → Propriedades do script:
 *     GITHUB_TOKEN = token "fine-grained" só de leitura do repo VictorCaixeta/bears-br
 *   Rode syncPosts() uma vez para autorizar; depois Acionadores → syncPosts a cada 1 hora.
 * Copia cada posts/AAAA-MM-DD/HHMM-assunto/ para:
 *   status aprovado/agendado/publicado → 03 · Posts publicados/AAAA-MM Mês/AAAA-MM-DD (dia)/HHh · Assunto/
 *   status aguardando                  → 02 · Aguardando aprovação/AAAA-MM-DD · HHh · Assunto/
 * e templates/*.jpg → 04 · Moldes dos cards/. Arquivos já existentes com o mesmo nome são substituídos.
 */
const REPO = 'VictorCaixeta/bears-br';
const ROOT_ID = '1n5j6hqqziv5dbj-MOhTKnwGaed0Db73Q';
const PUBLICADOS_ID = '1aCAQkFVrlNiDTjNun8QNRYa2AbXk52FV';
const AGUARDANDO_ID = '1Zgv7YrQhJo6XtmxDH8DiTaXkN-GP9W46';
const MOLDES_ID = '1K2ZBlqmG57VaRsqwpuKppi4OUWCm1ZwP';
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const DIAS = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];

function gh_(path, raw) {
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  const res = UrlFetchApp.fetch('https://api.github.com/repos/' + REPO + '/contents/' + encodeURI(path), {
    headers: { Authorization: 'Bearer ' + token, Accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json' },
    muteHttpExceptions: true,
  });
  if (res.getResponseCode() !== 200) throw new Error(path + ': HTTP ' + res.getResponseCode());
  return raw ? res.getBlob() : JSON.parse(res.getContentText());
}

function folder_(parent, name) {
  const it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

function put_(folder, name, blob) {
  const old = folder.getFilesByName(name);
  while (old.hasNext()) old.next().setTrashed(true);
  folder.createFile(blob.setName(name));
}

function titulo_(slug) {
  const t = slug.replace(/^\d{4}-/, '').replace(/-/g, ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function syncPosts() {
  const props = PropertiesService.getScriptProperties();
  const done = JSON.parse(props.getProperty('SYNCED') || '{}');
  for (const day of gh_('posts').filter(d => d.type === 'dir')) {
    for (const post of gh_(day.path).filter(d => d.type === 'dir')) {
      const files = gh_(post.path).filter(f => f.type === 'file');
      const meta = JSON.parse(gh_(post.path + '/meta.json', true).getDataAsString());
      const key = post.path + '|' + meta.status + '|' + files.map(f => f.sha).join(',');
      if (done[post.path] === key) continue;
      const [y, m, d] = day.name.split('-').map(Number);
      const hh = post.name.slice(0, 2) + 'h · ' + titulo_(post.name);
      let dest;
      if (meta.status === 'aguardando') {
        dest = folder_(DriveApp.getFolderById(AGUARDANDO_ID), day.name + ' · ' + hh);
      } else {
        const mes = folder_(DriveApp.getFolderById(PUBLICADOS_ID), y + '-' + String(m).padStart(2, '0') + ' ' + MESES[m - 1]);
        const dia = folder_(mes, day.name + ' (' + DIAS[new Date(y, m - 1, d).getDay()] + ')');
        dest = folder_(dia, hh);
        // saiu da aprovação → remove a pasta antiga de "aguardando"
        const ag = DriveApp.getFolderById(AGUARDANDO_ID).getFoldersByName(day.name + ' · ' + hh);
        while (ag.hasNext()) ag.next().setTrashed(true);
      }
      const imgs = files.filter(f => /\.jpg$/.test(f.name)).sort((a, b) => parseInt(a.name) - parseInt(b.name));
      imgs.forEach((f, i) => put_(dest, (i + 1) + ' de ' + imgs.length + '.jpg', gh_(f.path, true)));
      const leg = files.find(f => f.name === 'legenda.txt');
      if (leg) put_(dest, 'legenda.txt', gh_(leg.path, true));
      done[post.path] = key;
    }
  }
  const moldes = DriveApp.getFolderById(MOLDES_ID);
  for (const f of gh_('templates').filter(f => /\.jpg$/.test(f.name))) {
    if (done['t:' + f.path] === f.sha) continue;
    put_(moldes, f.name, gh_(f.path, true));
    done['t:' + f.path] = f.sha;
  }
  props.setProperty('SYNCED', JSON.stringify(done));
}
