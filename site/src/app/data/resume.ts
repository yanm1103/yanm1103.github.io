// Conteúdo do currículo nos dois idiomas. Para atualizar o site, basta editar este arquivo.
import { L, Text, l } from '../i18n';

export interface Experience {
  company: string;
  place: string;
  role: L;
  period: L;
  bullets: L[];
  stack?: Text[];
}

export interface Education {
  school: string;
  place: string;
  course: L;
  period: L;
  description: L;
}

export interface SkillGroup {
  name: L;
  items: Text[];
}

export const RESUME = {
  name: 'Yan Moura Virginio',
  alias: 'TwistZero',
  role: l('Desenvolvedor Web Fullstack', 'Fullstack Web Developer'),
  headlineStack: ['Angular', 'Java', 'AWS', 'Docker'],
  // Seção de ícones da página inicial (logos em public/images/stack/)
  mainStack: [
    { name: 'AngularJS', icon: 'angularjs' },
    { name: 'Java', icon: 'java' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Claude', icon: 'claude' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Playwright', icon: 'playwright' },
  ],
  location: l('Mauá, SP', 'Mauá, SP, Brazil'),
  // Troque pela foto definitiva: um PNG ou WebP com fundo transparente, recortado da cintura
  // para cima (proporção 3:4). Coloque em public/images/ e ajuste o caminho.
  photo: 'images/foto-placeholder.svg',
  tagline: l(
    'Aplicações web corporativas de ponta a ponta: frontend em Angular, APIs REST em Java e infraestrutura em AWS e Docker.',
    'End-to-end enterprise web applications: Angular frontends, Java REST APIs and infrastructure on AWS and Docker.',
  ),
  about: [
    l(
      'Trabalho desde 2022 na evolução de uma plataforma de compliance regulatório usada por cerca de 150 instituições financeiras, cuidando do ciclo completo: requisitos, código, deploy, infraestrutura AWS e suporte à produção. No dia a dia, também orquestro agentes Claude para acelerar o desenvolvimento, a revisão de código e os testes.',
      "Since 2022 I've been building and evolving a regulatory compliance platform used by about 150 financial institutions, covering the full cycle: requirements, code, deployment, AWS infrastructure and production support. I also orchestrate Claude agents day to day to speed up development, code review and testing.",
    ),
    l(
      'Em paralelo, faço pós-graduação em Desenvolvimento Full-Stack na PUC Minas e mantenho projetos pessoais: aplicações web, extensões para VS Code e, por curiosidade, alguns projetos de engenharia reversa.',
      "Alongside that, I'm doing a postgraduate specialization in Full-Stack Development at PUC Minas and keep a few personal projects: web apps, VS Code extensions and, out of curiosity, some reverse engineering work.",
    ),
  ],
  highlights: [
    { value: '4+', label: l('anos como dev', 'years as a developer') },
    { value: '~150', label: l('instituições financeiras atendidas', 'financial institutions served') },
    { value: '3', label: l('certificações em cloud e redes', 'cloud and networking certifications') },
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
      role: l('Desenvolvedor de Software', 'Software Developer'),
      period: l('Desde 2022', '2022 – present'),
      bullets: [
        l(
          'Desenvolvimento e evolução de plataforma de compliance regulatório usada por ~150 instituições financeiras, incluindo bancos e instituições de pagamento.',
          'Development and evolution of a regulatory compliance platform used by ~150 financial institutions, including banks and payment institutions.',
        ),
        l(
          'Atuação full cycle: levantamento técnico, implementação de funcionalidades, correção de incidentes (visando SLA) e suporte à produção.',
          'Full-cycle work: technical requirements, feature implementation, incident fixes (within SLA) and production support.',
        ),
        l(
          'Implementação e integração de APIs REST e automação de workflows baseados em regras de negócio.',
          'Implementation and integration of REST APIs and automation of business-rule-driven workflows.',
        ),
        l(
          'Administração de infraestrutura em AWS e configuração de servidores Nginx/Apache. Conteinerização com Docker e gestão de ambientes de deploy.',
          'AWS infrastructure administration and Nginx/Apache server configuration. Containerization with Docker and management of deployment environments.',
        ),
        l('Monitoramento e observabilidade com Grafana e Sentry.', 'Monitoring and observability with Grafana and Sentry.'),
      ],
      stack: ['AngularJS', 'Java', 'AWS', 'Docker', 'Karma/Jasmine', 'GitLab', 'Scrum'],
    },
    {
      company: 'ETEC Ribeirão Pires | Centro Paula Souza',
      place: 'SP',
      role: l('Estagiário de TI', 'IT Intern'),
      period: l('Mar 2019 – Dez 2019', 'Mar 2019 – Dec 2019'),
      bullets: [
        l(
          'Gestão e inventário de ativos de TI, com manutenção preventiva e corretiva de equipamentos e servidores.',
          'IT asset management and inventory, with preventive and corrective maintenance of equipment and servers.',
        ),
        l(
          'Administração de banco de dados PostgreSQL e manutenção do site institucional.',
          "PostgreSQL database administration and maintenance of the school's website.",
        ),
        l(
          'Configuração e suporte de infraestrutura de rede (topologia, roteadores, switches).',
          'Network infrastructure setup and support (topology, routers, switches).',
        ),
        l('Rotinas de backup e restauração para servidores e estações.', 'Backup and restore routines for servers and workstations.'),
        l(
          'Suporte técnico a usuários (hardware e software) em ambiente educacional.',
          'Hardware and software user support in an educational environment.',
        ),
      ],
      stack: ['PostgreSQL', l('Redes', 'Networking'), 'Backup'],
    },
  ] satisfies Experience[],

  education: [
    {
      school: 'PUC Minas',
      place: 'MG',
      course: l(
        'Especialização em Desenvolvimento Full-Stack (Pós-graduação)',
        'Postgraduate Specialization in Full-Stack Development',
      ),
      period: l('Desde Jan 2026', 'Jan 2026 – present'),
      description: l(
        'Arquiteturas Web, desenvolvimento Full Stack e cultura DevOps: definição de stack, integração contínua e implantação em cloud e on-premises. Gestão ágil de projetos e levantamento de requisitos.',
        'Web architectures, full-stack development and DevOps culture: choosing a stack, continuous integration and deployment to cloud and on-premises environments. Agile project management and requirements gathering.',
      ),
    },
    {
      school: 'FATEC São Caetano do Sul',
      place: 'SP',
      course: l('Tecnólogo em Segurança da Informação', 'Associate Degree in Information Security'),
      period: l('Jan 2017 – Dez 2019', 'Jan 2017 – Dec 2019'),
      description: l(
        'Auditoria ISO 27001, análise de riscos, segurança da informação e programação (C, HTML, CSS, JavaScript, MySQL).',
        'ISO 27001 auditing, risk analysis, information security and programming (C, HTML, CSS, JavaScript, MySQL).',
      ),
    },
  ] satisfies Education[],

  certificates: [
    'Microsoft Certified: Azure Fundamentals (AZ-900)',
    l('Google Cloud: Inteligência Artificial', 'Google Cloud: Artificial Intelligence'),
    'Cisco CCNA: Routing and Switching Essentials',
  ] as Text[],

  skills: [
    {
      name: l('Linguagens', 'Languages'),
      items: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C', 'C++', 'C#'],
    },
    {
      name: l('Frontend', 'Frontend'),
      items: ['Angular', 'AngularJS', 'HTML5', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Angular Material'],
    },
    {
      name: l('Backend & APIs', 'Backend & APIs'),
      items: [l('APIs REST', 'REST APIs'), l('Integração de sistemas', 'Systems integration'), 'Node.js', 'Express'],
    },
    {
      name: l('Cloud & Infra', 'Cloud & Infra'),
      items: ['AWS (EC2, S3, Route 53, Security Groups)', 'Microsoft Azure', 'Google Cloud'],
    },
    {
      name: l('DevOps & Ferramentas', 'DevOps & Tools'),
      items: ['Docker', 'CI/CD', 'Git', 'GitLab', 'Nginx', 'Apache', 'Grafana', 'Sentry'],
    },
    { name: l('Metodologias', 'Methodologies'), items: ['Scrum', 'Agile'] },
  ] satisfies SkillGroup[],

  languages: [
    { name: l('Português', 'Portuguese'), level: l('Nativo', 'Native') },
    { name: l('Inglês', 'English'), level: l('Fluente (TOEFL ITP 640, C1)', 'Fluent (TOEFL ITP 640, C1)') },
    { name: l('Japonês', 'Japanese'), level: l('Básico-intermediário (JLPT N5)', 'Lower intermediate (JLPT N5)') },
  ],
};
