# yanm1103.github.io

Meu site pessoal: currículo e projetos, publicado em https://yanm1103.github.io/ (português) e https://yanm1103.github.io/en (inglês).

- `site/`: código do site (Angular 22, pré-renderizado como páginas estáticas).
- Raiz (`index.html`, `en/`, `projetos/`, `*.js`…): site compilado, que é o que o GitHub Pages publica.
  Esses arquivos são gerados; não edite à mão (a lista fica em `.site-manifest`).
- `tour-of-heroes/`: build antigo do Angular Tour of Heroes, servido em `/tour-of-heroes/`.
- `.github/workflows/deploy.yml`: a cada push na `main` que mexa em `site/`, compila e
  atualiza os arquivos da raiz automaticamente.

## Rodando localmente

Precisa de Node 22.22.3+ ou 24.15+.

```bash
cd site
npm install
npm start          # http://localhost:4200
npm run build      # gera site/dist/site/browser
npm run publish    # build + copia para a raiz (o workflow já faz isso sozinho)
```

## Editando o conteúdo

Todo texto aparece nos dois idiomas no formato `l('português', 'english')`.

- Currículo: `site/src/app/data/resume.ts`
- Textos fixos da interface (menus, títulos de seção): `site/src/app/i18n.ts`
- Projetos: `site/src/app/data/projects.ts` (`featured: true` coloca o projeto na página inicial)
- Foto do banner: coloque a imagem em `site/public/images/` e ajuste `photo` em `resume.ts`.
