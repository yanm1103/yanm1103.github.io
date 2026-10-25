// Copia o build (site/dist/site/browser) para a raiz do repositório, que é o que o
// GitHub Pages publica. Os arquivos copiados ficam listados em .site-manifest, para
// que a próxima publicação apague os antigos (os nomes dos .js mudam a cada build).
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..', '..');
const dist = resolve(import.meta.dirname, '..', 'dist', 'site', 'browser');
const manifestPath = join(root, '.site-manifest');

// Nunca apagar nem sobrescrever estes itens da raiz.
const PROTECTED = new Set(['.git', '.github', 'site', 'tour-of-heroes', 'README.md', '.site-manifest']);
const SKIP = new Set(['index.csr.html']);

if (!existsSync(join(dist, 'index.html'))) {
  console.error('Build não encontrado. Rode "npm run build" antes.');
  process.exit(1);
}

// 1. remove a publicação anterior
if (existsSync(manifestPath)) {
  for (const name of readFileSync(manifestPath, 'utf8').split('\n').filter(Boolean)) {
    if (!PROTECTED.has(name)) rmSync(join(root, name), { recursive: true, force: true });
  }
}

// 2. copia o build novo
const published = [];
for (const name of readdirSync(dist)) {
  if (SKIP.has(name) || PROTECTED.has(name)) continue;
  cpSync(join(dist, name), join(root, name), { recursive: true });
  published.push(name);
}

// 3. 404.html (o GitHub Pages usa esse arquivo para endereços que não existem)
cpSync(join(dist, '404', 'index.html'), join(root, '404.html'));
published.push('404.html');

// 4. sem Jekyll: os arquivos são servidos como estão
writeFileSync(join(root, '.nojekyll'), '');
published.push('.nojekyll');

writeFileSync(manifestPath, published.sort().join('\n') + '\n');
console.log(`Publicado na raiz: ${published.length} itens.`);
