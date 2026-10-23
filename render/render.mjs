// Gera JPGs 1080×1350 a partir dos arquivos .dc.html.
// Uso: node render/render.mjs <arquivo-ou-pasta> [...]   (a partir da raiz do repo)
//   - arquivo .dc.html → gera <mesmo-nome>.jpg ao lado (ou em ../ se estiver numa pasta src/)
//   - pasta → renderiza todos os .dc.html dentro dela
// Também imprime um relatório de layout (estouro de bordas e espaço mínimo entre blocos).
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = path.join(ROOT, 'render', 'node_modules', '@fontsource');
const BLOBS = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'blobs.json'), 'utf8'));
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';

const fontCss = [
  ['barlow-condensed', [600, 800]], ['barlow', [500, 600]], ['fraunces', [600, 800]],
  ['source-sans-3', [500, 600, 700]], ['bangers', [400]], ['dm-sans', [500, 700, 800]], ['anton', [400]],
].flatMap(([f, ws]) => ws.map(w => `<link rel="stylesheet" href="file://${FONTS}/${f}/${w}.css">`)).join('\n');

function collect(p) {
  const abs = path.resolve(p);
  if (fs.statSync(abs).isDirectory()) {
    return fs.readdirSync(abs, { recursive: true }).map(f => path.join(abs, f)).filter(f => f.endsWith('.dc.html')).sort();
  }
  return [abs];
}

function outPath(file) {
  const dir = path.dirname(file);
  const base = path.basename(file, '.dc.html') + '.jpg';
  return path.basename(dir) === 'src' ? path.join(path.dirname(dir), base) : path.join(dir, base);
}

const files = process.argv.slice(2).flatMap(collect);
if (!files.length) { console.error('Nada para renderizar.'); process.exit(1); }

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
let problems = 0;
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8')
    .replace(/<script src="\.\/support\.js"><\/script>/, '')
    .replace(/<link[^>]*fonts\.google[^>]*>/g, '')
    .replace('<helmet>', '<helmet>' + fontCss)
    .replace(/<style>/, '<style>*{animation-play-state:paused!important}');
  for (const [id, rel] of Object.entries(BLOBS)) html = html.replaceAll(`/_blob/${id}`, 'file://' + path.join(ROOT, rel));
  const tmp = file + '.tmp.html';
  fs.writeFileSync(tmp, html);
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const issues = await page.evaluate(() => {
    const c = document.querySelector('x-dc > div'); const cr = c.getBoundingClientRect(); const out = [];
    c.querySelectorAll('*').forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.width && (r.right > cr.right + 1 || r.bottom > cr.bottom + 1 || r.left < cr.left - 1) && !e.closest('[aria-hidden]')) out.push('fora da borda: ' + (e.textContent || e.tagName).trim().slice(0, 40));
    });
    document.querySelectorAll('img').forEach(i => { if (!i.naturalWidth) out.push('imagem não carregou: ' + i.getAttribute('src')); });
    const kids = [...c.children].map(k => k.getBoundingClientRect());
    let gap = 1e9; for (let i = 1; i < kids.length; i++) gap = Math.min(gap, kids[i].top - kids[i - 1].bottom);
    if (gap < 10) out.push('blocos colados (espaço mínimo ' + Math.round(gap) + 'px)');
    return out;
  });
  const out = outPath(file);
  await (await page.$('x-dc > div')).screenshot({ path: out, type: 'jpeg', quality: 95 });
  fs.unlinkSync(tmp);
  problems += issues.length;
  console.log((issues.length ? '⚠ ' : '✓ ') + path.relative(ROOT, out) + (issues.length ? '  →  ' + issues.join(' | ') : ''));
}
await browser.close();
process.exit(problems ? 2 : 0);
