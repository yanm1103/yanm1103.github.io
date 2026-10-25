// Conteúdo do currículo. Para atualizar o site, basta editar este arquivo.

export interface Link {
  label: string;
  url: string;
}

export interface Experience {
  company: string;
  place: string;
  role: string;
  period: string;
  bullets: string[];
  stack?: string[];
}

export interface Education {
  school: string;
  place: string;
  course: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export const RESUME = {
  name: 'Yan Moura Virginio',
  alias: 'TwistZero',
  role: 'Desenvolvedor Web Fullstack',
  headlineStack: ['Angular', 'Java', 'AWS', 'Docker'],
  location: 'Mauá, SP',
  // Troque pela foto definitiva: coloque o arquivo em public/images/ e ajuste o caminho.
  photo: 'images/foto-placeholder.svg',
  photoIsPlaceholder: true,
  summary:
    'Desenvolvedor com experiência em plataformas corporativas de compliance regulatório, integração de APIs REST ' +
    'e administração de infraestrutura cloud. Atuação em ambientes críticos com responsabilidade técnica e suporte à produção. ' +
    'Nas horas vagas, faço engenharia reversa e ports para PC de jogos antigos.',
  highlights: [
    { value: '4+', label: 'anos como dev' },
    { value: '~150', label: 'instituições financeiras atendidas' },
    { value: '2', label: 'jogos portados para PC' },
  ],
  email: 'yanmv11@gmail.com',
  links: {
    github: 'https://github.com/yanm1103',
    linkedin: 'https://www.linkedin.com/in/yanmoura',
  },

  experience: [
    {
      company: 'LYE/MK Consultoria',
      place: 'SP',
      role: 'Desenvolvedor de Software',
      period: 'Desde 2022',
      bullets: [
        'Desenvolvimento e evolução de plataforma de compliance regulatório usada por ~150 instituições financeiras, incluindo bancos e instituições de pagamento.',
        'Atuação full cycle: levantamento técnico, implementação de funcionalidades, correção de incidentes (visando SLA) e suporte à produção.',
        'Implementação e integração de APIs REST e automação de workflows baseados em regras de negócio.',
        'Administração de infraestrutura em AWS e configuração de servidores Nginx/Apache. Conteinerização com Docker e gestão de ambientes de deploy.',
        'Monitoramento e observabilidade com Grafana e Sentry.',
      ],
      stack: ['AngularJS', 'Java', 'AWS', 'Docker', 'Karma/Jasmine', 'GitLab', 'Scrum'],
    },
    {
      company: 'ETEC Ribeirão Pires | Centro Paula Souza',
      place: 'SP',
      role: 'Estagiário de TI',
      period: 'Mar 2019 – Dez 2019',
      bullets: [
        'Gestão e inventário de ativos de TI, com manutenção preventiva e corretiva de equipamentos e servidores.',
        'Administração de banco de dados PostgreSQL e manutenção do site institucional.',
        'Configuração e suporte de infraestrutura de rede (topologia, roteadores, switches).',
        'Rotinas de backup e restauração para servidores e estações.',
        'Suporte técnico a usuários (hardware e software) em ambiente educacional.',
      ],
      stack: ['PostgreSQL', 'Redes', 'Backup'],
    },
  ] satisfies Experience[],

  education: [
    {
      school: 'PUC Minas',
      place: 'MG',
      course: 'Especialização em Desenvolvimento Full-Stack (Pós-graduação)',
      period: 'Desde Jan 2026',
      description:
        'Arquiteturas Web, desenvolvimento Full Stack e cultura DevOps: definição de stack, integração contínua e implantação em cloud e on-premises. Gestão ágil de projetos e levantamento de requisitos.',
    },
    {
      school: 'FATEC São Caetano do Sul',
      place: 'SP',
      course: 'Tecnólogo em Segurança da Informação',
      period: 'Jan 2017 – Dez 2019',
      description:
        'Auditoria ISO 27001, análise de riscos, segurança da informação e programação (C, HTML, CSS, JavaScript, MySQL).',
    },
  ] satisfies Education[],

  certificates: [
    'Microsoft Certified: Azure Fundamentals (AZ-900)',
    'Google Cloud: Inteligência Artificial',
    'Cisco CCNA: Routing and Switching Essentials',
  ],

  skills: [
    { name: 'Linguagens', items: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C', 'C++', 'C#', 'ZScript'] },
    { name: 'Frontend', items: ['Angular', 'AngularJS', 'HTML5', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Angular Material'] },
    { name: 'Backend & APIs', items: ['APIs REST', 'Integração de sistemas', 'Node.js', 'Express'] },
    { name: 'Cloud & Infra', items: ['AWS (EC2, S3, Route 53, Security Groups)', 'Microsoft Azure', 'Google Cloud'] },
    { name: 'DevOps & Ferramentas', items: ['Docker', 'CI/CD', 'Git', 'GitLab', 'Nginx', 'Apache', 'Grafana', 'Sentry'] },
    { name: 'Metodologias', items: ['Scrum', 'Agile'] },
  ] satisfies SkillGroup[],

  languages: [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Fluente (TOEFL ITP 640, C1)' },
    { name: 'Japonês', level: 'Básico-intermediário (JLPT N5)' },
  ],
};
