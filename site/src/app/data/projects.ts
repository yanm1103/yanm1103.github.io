// Projetos pessoais. Os marcados com `featured: true` aparecem na página inicial.
import { L, Text, l } from '../i18n';

export type ProjectCategory = 'games' | 'web' | 'tools' | 'study';

export const CATEGORY_LABEL: Record<ProjectCategory, L> = {
  games: l('Jogos & engenharia reversa', 'Games & reverse engineering'),
  web: l('Web', 'Web'),
  tools: l('Ferramentas', 'Tools'),
  study: l('Estudos', 'Studies'),
};

export const PROJECT_CATEGORIES: ProjectCategory[] = ['web', 'tools', 'study', 'games'];

export interface ProjectLink {
  url: string;
  kind: 'repo' | 'live' | 'video' | 'download';
}

export interface Project {
  slug: string;
  name: Text;
  year: string;
  category: ProjectCategory;
  summary: L;
  tags: Text[];
  links: ProjectLink[];
  image?: string;
  /** Logo com fundo transparente, mostrado por cima da imagem. */
  logo?: string;
  featured?: boolean;
}

const GH = 'https://github.com/yanm1103';

export const PROJECTS: Project[] = [
  {
    slug: 'wotm-recompiled',
    name: 'War of the Monsters Recompiled',
    year: '2026',
    category: 'games',
    summary: l(
      'Port nativo para PC do War of the Monsters (PS2). O código do processador é recompilado estaticamente para C++ e a renderização, o som e os controles foram reescritos para rodar direto no PC, sem emulador: 60 fps, widescreen e suporte a gamepad.',
      'Native PC port of War of the Monsters (PS2). The CPU code is statically recompiled to C++, and rendering, sound and input were rewritten to run natively on PC, with no emulator: 60 fps, widescreen and gamepad support.',
    ),
    tags: ['C++', 'Python', 'raylib', 'PS2Recomp', l('Recompilação estática', 'Static recompilation')],
    links: [
      { url: `${GH}/War_of_the_Monsters_recomp`, kind: 'repo' },
      { url: 'https://www.youtube.com/watch?v=IvLLuSYORPc', kind: 'video' },
    ],
    image: 'images/wotm-recompiled.webp',
    logo: 'images/wotm-recompiled-logo.webp',
    featured: true,
  },
  {
    slug: 'wotm-model-museum',
    name: 'WotM Model Museum',
    year: '2026',
    category: 'games',
    summary: l(
      'Visualizador 3D no navegador com os monstros do War of the Monsters: modelos, figurinos e animações, com wireframe, ossos, presets de iluminação e exportação em .glb validado pelo glTF Validator.',
      'In-browser 3D viewer for the War of the Monsters creatures: models, costumes and animations, with wireframe, bones, lighting presets and .glb export that passes the glTF Validator.',
    ),
    tags: ['JavaScript', 'Three.js', 'Vite', 'glTF'],
    links: [
      { url: 'https://yanm1103.github.io/wotm-model-museum/', kind: 'live' },
      { url: `${GH}/wotm-model-museum`, kind: 'repo' },
    ],
    image: 'images/wotm-model-museum.webp',
  },
  {
    slug: 'mikis-world',
    name: "Miki's World PC Collection",
    year: '2026',
    category: 'games',
    summary: l(
      "Decompilação completa e port para PC dos dois jogos de celular Miki's World (Sumea, 2002). Lógica validada contra o bytecode original, com remapeamento de controles, gamepad, shaders (CRT, LCD, xBRZ) e suporte a mods.",
      "Full decompilation and PC port of the two Miki's World mobile phone games (Sumea, 2002). Game logic validated against the original bytecode, with key remapping, gamepad support, shaders (CRT, LCD, xBRZ) and mod support.",
    ),
    tags: ['C#', '.NET', 'J2ME', 'GLSL', l('Decompilação', 'Decompilation')],
    links: [
      { url: `${GH}/mikisworld`, kind: 'repo' },
      { url: `${GH}/mikisworld/releases`, kind: 'download' },
    ],
    image: 'images/mikis-world.webp',
    featured: true,
  },
  {
    slug: 'calculo-investimentos',
    name: l('Cálculo de Investimentos', 'Investment Calculator'),
    year: '2026',
    category: 'web',
    summary: l(
      'Planejador financeiro simples: simula a evolução de investimentos ao longo do tempo e permite incluir compras planejadas. Serve para dar um norte, não como recomendação.',
      'Simple financial planner: simulates how investments grow over time and lets you add planned purchases. Meant as a rough guide, not financial advice.',
    ),
    tags: ['JavaScript', 'HTML', 'CSS'],
    links: [
      { url: 'https://yanm1103.github.io/CalculoInvestimentos/', kind: 'live' },
      { url: `${GH}/CalculoInvestimentos`, kind: 'repo' },
    ],
    image: 'images/calculo-investimentos.webp',
  },
  {
    slug: 'estudo-de-api',
    name: l('Estudo de API', 'API Study'),
    year: '2026',
    category: 'study',
    summary: l(
      'API REST com CRUD de jogos, feita para estudar Express e MongoDB com Mongoose.',
      'REST API with a CRUD for games, built to learn Express and MongoDB with Mongoose.',
    ),
    tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    links: [{ url: `${GH}/Estudo-de-API`, kind: 'repo' }],
  },
  {
    slug: 'timeout-angularjs',
    name: l('Teste de $timeout no AngularJS', 'AngularJS $timeout Test'),
    year: '2026',
    category: 'study',
    summary: l(
      'Demonstração interativa do digest cycle do AngularJS: compara setTimeout, $apply e $timeout e mostra quando o digest é automático, quando é preciso acioná-lo e por que $timeout + $apply é redundante.',
      'Interactive demo of the AngularJS digest cycle: compares setTimeout, $apply and $timeout, showing when the digest runs on its own, when you have to trigger it, and why $timeout + $apply is redundant.',
    ),
    tags: ['AngularJS', 'JavaScript'],
    links: [
      { url: 'https://yanm1103.github.io/teste-de-timeout-AngularJS/$timeout_test.html', kind: 'live' },
      { url: `${GH}/teste-de-timeout-AngularJS`, kind: 'repo' },
    ],
    image: 'images/timeout-angularjs.webp',
  },
  {
    slug: 'alfresco-rhino',
    name: 'Rhino for Alfresco Web Scripts',
    year: '2025',
    category: 'tools',
    summary: l(
      'Extensão para VS Code com realce de sintaxe para Web Scripts do Alfresco 6.2, que rodam no motor Rhino: tags <import> e construções como "for each" deixam de quebrar o realce padrão de JavaScript.',
      'VS Code extension with syntax highlighting for Alfresco 6.2 Web Scripts, which run on the Rhino engine: <import> tags and constructs like "for each" no longer break the default JavaScript highlighting.',
    ),
    tags: ['VS Code', 'TextMate grammar', 'Rhino', 'Alfresco'],
    links: [{ url: `${GH}/alfresco-rhino`, kind: 'repo' }],
    image: 'images/alfresco-rhino.webp',
  },
  {
    slug: 'java-learn',
    name: 'JavaLearn',
    year: '2025',
    category: 'study',
    summary: l(
      'Exercícios em Java para praticar conceitos mais específicos da linguagem, com build em Gradle.',
      'Java exercises to practice the more specific parts of the language, built with Gradle.',
    ),
    tags: ['Java', 'Gradle'],
    links: [{ url: `${GH}/JavaLearn`, kind: 'repo' }],
  },
  {
    slug: 'tour-of-heroes',
    name: 'Angular Tour of Heroes',
    year: '2024',
    category: 'study',
    summary: l(
      'O tutorial oficial do Angular 17, bem modificado: tema customizado do Angular Material com modo claro/escuro, carrossel próprio e busca de heróis.',
      "Angular 17's official tutorial, heavily customized: custom Angular Material theme with light/dark mode, a hand-made carousel and hero search.",
    ),
    tags: ['Angular', 'Angular Material', 'TypeScript', 'SCSS'],
    links: [
      { url: '/tour-of-heroes/', kind: 'live' },
      { url: `${GH}/Angular-Tour-of-Heroes`, kind: 'repo' },
    ],
    image: 'images/tour-of-heroes.webp',
  },
];
