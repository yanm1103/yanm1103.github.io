// Projetos pessoais. Os marcados com `featured: true` aparecem na página inicial.

export type ProjectCategory = 'Jogos & engenharia reversa' | 'Web' | 'Ferramentas' | 'Estudos';

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'repo' | 'live' | 'video' | 'download';
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  tags: string[];
  links: ProjectLink[];
  image?: string;
  featured?: boolean;
}

const GH = 'https://github.com/yanm1103';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Jogos & engenharia reversa',
  'Web',
  'Ferramentas',
  'Estudos',
];

export const PROJECTS: Project[] = [
  {
    slug: 'wotm-recompiled',
    name: 'War of the Monsters Recompiled',
    year: '2026',
    category: 'Jogos & engenharia reversa',
    summary:
      'Port nativo para PC do War of the Monsters (PS2). O código do processador é recompilado estaticamente para C++ e a renderização, o som e os controles foram reescritos para rodar direto no PC, sem emulador: 60 fps, widescreen e suporte a gamepad.',
    tags: ['C++', 'Python', 'raylib', 'PS2Recomp', 'Recompilação estática'],
    links: [
      { label: 'Repositório', url: `${GH}/War_of_the_Monsters_recomp`, kind: 'repo' },
      { label: 'Vídeo', url: 'https://www.youtube.com/watch?v=IvLLuSYORPc', kind: 'video' },
    ],
    image: 'images/wotm-recompiled.webp',
    featured: true,
  },
  {
    slug: 'wotm-model-museum',
    name: 'WotM Model Museum',
    year: '2026',
    category: 'Jogos & engenharia reversa',
    summary:
      'Visualizador 3D no navegador com os monstros do War of the Monsters: modelos, figurinos e animações, com wireframe, ossos, presets de iluminação e exportação em .glb validado pelo glTF Validator.',
    tags: ['JavaScript', 'Three.js', 'Vite', 'glTF'],
    links: [
      { label: 'Abrir', url: 'https://yanm1103.github.io/wotm-model-museum/', kind: 'live' },
      { label: 'Repositório', url: `${GH}/wotm-model-museum`, kind: 'repo' },
    ],
    image: 'images/wotm-model-museum.webp',
    featured: true,
  },
  {
    slug: 'mikis-world',
    name: "Miki's World PC Collection",
    year: '2026',
    category: 'Jogos & engenharia reversa',
    summary:
      "Decompilação completa e port para PC dos dois jogos de celular Miki's World (Sumea, 2002). Lógica validada contra o bytecode original, com remapeamento de controles, gamepad, shaders (CRT, LCD, xBRZ) e suporte a mods.",
    tags: ['C#', '.NET', 'J2ME', 'GLSL', 'Decompilação'],
    links: [
      { label: 'Repositório', url: `${GH}/mikisworld`, kind: 'repo' },
      { label: 'Download', url: `${GH}/mikisworld/releases`, kind: 'download' },
    ],
    image: 'images/mikis-world.webp',
    featured: true,
  },
  {
    slug: 'calculo-investimentos',
    name: 'Cálculo de Investimentos',
    year: '2026',
    category: 'Web',
    summary:
      'Planejador financeiro simples: simula a evolução de investimentos ao longo do tempo e permite incluir compras planejadas. Serve para dar um norte, não como recomendação.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    links: [
      { label: 'Abrir', url: 'https://yanm1103.github.io/CalculoInvestimentos/', kind: 'live' },
      { label: 'Repositório', url: `${GH}/CalculoInvestimentos`, kind: 'repo' },
    ],
  },
  {
    slug: 'estudo-de-api',
    name: 'Estudo de API',
    year: '2026',
    category: 'Estudos',
    summary: 'API REST com CRUD de jogos, feita para estudar Express e MongoDB com Mongoose.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    links: [{ label: 'Repositório', url: `${GH}/Estudo-de-API`, kind: 'repo' }],
  },
  {
    slug: 'timeout-angularjs',
    name: 'Teste de $timeout no AngularJS',
    year: '2026',
    category: 'Estudos',
    summary:
      'Demonstração interativa do digest cycle do AngularJS: compara setTimeout, $apply e $timeout e mostra quando o digest é automático, quando é preciso acioná-lo e por que $timeout + $apply é redundante.',
    tags: ['AngularJS', 'JavaScript'],
    links: [
      {
        label: 'Abrir',
        url: 'https://yanm1103.github.io/teste-de-timeout-AngularJS/$timeout_test.html',
        kind: 'live',
      },
      { label: 'Repositório', url: `${GH}/teste-de-timeout-AngularJS`, kind: 'repo' },
    ],
  },
  {
    slug: 'alfresco-rhino',
    name: 'Rhino for Alfresco Web Scripts',
    year: '2025',
    category: 'Ferramentas',
    summary:
      'Extensão para VS Code com realce de sintaxe para Web Scripts do Alfresco 6.2, que rodam no motor Rhino: tags <import> e construções como "for each" deixam de quebrar o realce padrão de JavaScript.',
    tags: ['VS Code', 'TextMate grammar', 'Rhino', 'Alfresco'],
    links: [{ label: 'Repositório', url: `${GH}/alfresco-rhino`, kind: 'repo' }],
  },
  {
    slug: 'java-learn',
    name: 'JavaLearn',
    year: '2025',
    category: 'Estudos',
    summary: 'Exercícios em Java para praticar conceitos mais específicos da linguagem, com build em Gradle.',
    tags: ['Java', 'Gradle'],
    links: [{ label: 'Repositório', url: `${GH}/JavaLearn`, kind: 'repo' }],
  },
  {
    slug: 'tour-of-heroes',
    name: 'Angular Tour of Heroes',
    year: '2024',
    category: 'Web',
    summary:
      'O tutorial oficial do Angular 17, bem modificado: tema customizado do Angular Material com modo claro/escuro, carrossel próprio e busca de heróis.',
    tags: ['Angular', 'Angular Material', 'TypeScript', 'SCSS'],
    links: [
      { label: 'Abrir', url: '/tour-of-heroes/', kind: 'live' },
      { label: 'Repositório', url: `${GH}/Angular-Tour-of-Heroes`, kind: 'repo' },
    ],
  },
  {
    slug: 'angular-first-app',
    name: 'Angular First App',
    year: '2024',
    category: 'Estudos',
    summary: 'Primeiro app em Angular, estilizado com Angular Material e responsivo, com backend simulado via json-server.',
    tags: ['Angular', 'Angular Material', 'json-server'],
    links: [{ label: 'Repositório', url: `${GH}/Angular-First-App-Tutorial`, kind: 'repo' }],
  },
  {
    slug: 'doom-chaves',
    name: 'DOOM Chaves',
    year: '2014 · 2020',
    category: 'Jogos & engenharia reversa',
    summary:
      'Mod para DOOM 2 baseado em Chaves, criado aos 15 anos e retomado em 2020: mapas em UDMF, armas, monstros, HUD e sons próprios, rodando no GZDoom.',
    tags: ['ZScript', 'DECORATE', 'GZDoom', 'Level design'],
    links: [
      { label: 'Repositório', url: `${GH}/DOOM-Chaves`, kind: 'repo' },
      { label: 'Vídeo', url: 'https://youtu.be/fmqVgwJOd34', kind: 'video' },
    ],
  },
  {
    slug: 'blender-donut',
    name: 'Blender: Donut and Plate',
    year: '2019',
    category: 'Estudos',
    summary: 'Modelagem e renderização 3D seguindo o clássico tutorial do donut do Blender Guru.',
    tags: ['Blender', '3D'],
    links: [{ label: 'Repositório', url: `${GH}/Blender-Donut-and-plate`, kind: 'repo' }],
  },
  {
    slug: 'exercicios-c',
    name: 'Exercícios em C (FATEC SCS)',
    year: '2017',
    category: 'Estudos',
    summary: 'Listas de exercícios de C da faculdade. Já foi forkado mais de 40 vezes por outros alunos.',
    tags: ['C'],
    links: [{ label: 'Repositório', url: `${GH}/Exercicios-C-FatecSCS-2017`, kind: 'repo' }],
  },
];
