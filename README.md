# yanm1103.github.io

Meu site pessoal: currículo e projetos, publicado em https://yanm1103.github.io/ (português) e https://yanm1103.github.io/en (inglês).

- `site/`: código do site (Angular 22, pré-renderizado como páginas estáticas).
- `tour-of-heroes/`: build antigo do Angular Tour of Heroes, servido em `/tour-of-heroes/`.
- `.github/workflows/deploy.yml`: build e deploy automático a cada push na `main`.

## Rodando localmente

Precisa de Node 22.22.3+ ou 24.15+.

```bash
cd site
npm install
npm start          # http://localhost:4200
npm run build      # gera site/dist/site/browser
```

## Editando o conteúdo

Todo texto aparece nos dois idiomas no formato `l('português', 'english')`.

- Currículo: `site/src/app/data/resume.ts`
- Textos fixos da interface (menus, títulos de seção): `site/src/app/i18n.ts`
- Projetos: `site/src/app/data/projects.ts` (`featured: true` coloca o projeto na página inicial)
- Foto do banner: coloque a imagem em `site/public/images/` e ajuste `photo` em `resume.ts`.
