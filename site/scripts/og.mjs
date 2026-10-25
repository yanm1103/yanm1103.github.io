// Gera as imagens de preview (Open Graph) a partir de og/og.html:
//   public/og-image.jpg     (português)
//   public/og-image-en.jpg  (inglês)
// Usa o Chrome ou o Edge instalado, sem abrir janela. Rode de novo sempre que mudar a
// foto ou os textos do preview:  npm run og
// Para usar outro navegador: CHROME_PATH="/caminho/do/navegador" npm run og
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const page = pathToFileURL(join(root, 'og', 'og.html')).href;

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge',
];
const browser = candidates.find((p) => p && existsSync(p));
if (!browser) {
  console.error('Chrome/Edge não encontrado. Informe o caminho em CHROME_PATH.');
  process.exit(1);
}

for (const [lang, file] of [
  ['pt', 'og-image.jpg'],
  ['en', 'og-image-en.jpg'],
]) {
  const out = join(root, 'public', file);
  const profile = mkdtempSync(join(tmpdir(), 'og-'));
  spawnSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=6000',
      `--user-data-dir=${profile}`,
      `--screenshot=${out}`,
      `${page}?lang=${lang}`,
    ],
    { stdio: 'ignore' },
  );
  rmSync(profile, { recursive: true, force: true });
  if (!existsSync(out) || statSync(out).size === 0) {
    console.error(`Falhou ao gerar ${file}.`);
    process.exit(1);
  }
  console.log(`Gerado public/${file}`);
}
