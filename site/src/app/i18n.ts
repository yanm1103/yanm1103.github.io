import { DOCUMENT } from '@angular/common';
import { Injectable, Pipe, PipeTransform, computed, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

export type Lang = 'pt' | 'en';

/** Texto nos dois idiomas. */
export interface L {
  pt: string;
  en: string;
}

export type Text = string | L;

export const l = (pt: string, en: string): L => ({ pt, en });

export function tr(value: Text, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}

/** Uso no template: {{ texto | tr: lang() }} */
@Pipe({ name: 'tr' })
export class TrPipe implements PipeTransform {
  transform(value: Text, lang: Lang): string {
    return tr(value, lang);
  }
}

// Rotas equivalentes nos dois idiomas.
const PATHS: Record<Lang, { home: string; projects: string }> = {
  pt: { home: '/', projects: '/projetos' },
  en: { home: '/en', projects: '/en/projects' },
};

// Título, descrição e imagem do preview de links (o título da aba fica em app.routes.ts).
const SEO = {
  title: l('Yan Moura · Desenvolvedor Web Fullstack', 'Yan Moura · Fullstack Web Developer'),
  description: l(
    'Desenvolvedor web fullstack focado em plataformas de compliance bancário: Angular, Java, AWS e Docker. Currículo, experiência e projetos.',
    'Fullstack web developer focused on banking compliance platforms: Angular, Java, AWS and Docker. Résumé, experience and projects.',
  ),
  image: l('og-image.jpg', 'og-image-en.jpg'),
  imageAlt: l('Yan Moura Virginio, desenvolvedor web fullstack', 'Yan Moura Virginio, fullstack web developer'),
};

/** O idioma vem da URL: tudo que começa com /en é inglês. */
@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly doc = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  readonly lang = signal<Lang>('pt');
  readonly paths = computed(() => PATHS[this.lang()]);
  /** Mesma página no outro idioma, mantendo a seção (#fragmento). */
  readonly alternate = signal('/en');

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.apply(e.urlAfterRedirects);
    });
  }

  private apply(url: string) {
    const [path, fragment] = splitUrl(url);
    const lang: Lang = path === '/en' || path.startsWith('/en/') ? 'en' : 'pt';
    const other: Lang = lang === 'pt' ? 'en' : 'pt';
    const page: keyof (typeof PATHS)['pt'] = path === PATHS[lang].projects ? 'projects' : 'home';

    this.lang.set(lang);
    this.alternate.set(PATHS[other][page] + (fragment ? '#' + fragment : ''));

    this.doc.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    this.setSeo(lang, page);
    this.setAlternateLinks(page);
  }

  // Como as páginas são pré-renderizadas, estas tags já saem prontas no HTML de cada
  // rota, que é o que WhatsApp, LinkedIn etc. leem (eles não rodam JavaScript).
  private setSeo(lang: Lang, page: 'home' | 'projects') {
    const title = SEO.title[lang];
    const description = SEO.description[lang];
    const image = `${SITE}/${SEO.image[lang]}`;
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: SITE + PATHS[lang][page] });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'en' ? 'en_US' : 'pt_BR' });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: SEO.imageAlt[lang] });
  }

  // <link rel="alternate" hreflang> para buscadores acharem a outra versão
  private setAlternateLinks(page: 'home' | 'projects') {
    const head = this.doc.head;
    head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    for (const [lang, hreflang] of [
      ['pt', 'pt-BR'],
      ['en', 'en'],
    ] as const) {
      const link = this.doc.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', SITE + PATHS[lang][page]);
      head.appendChild(link);
    }
  }
}

const SITE = 'https://yanm1103.github.io';

function splitUrl(url: string): [string, string | null] {
  const hash = url.indexOf('#');
  const fragment = hash >= 0 ? url.slice(hash + 1) : null;
  const path = (hash >= 0 ? url.slice(0, hash) : url).split('?')[0] || '/';
  return [path, fragment];
}

/** Textos fixos da interface. */
export const UI = {
  skip: l('Pular para o conteúdo', 'Skip to content'),
  home: l('Início', 'Home'),
  sections: l('Seções', 'Sections'),
  menu: l('Menu', 'Menu'),
  allProjects: l('Todos os projetos', 'All projects'),
  lightTheme: l('Usar tema claro', 'Use light theme'),
  darkTheme: l('Usar tema escuro', 'Use dark theme'),
  switchLang: l('Read in English', 'Ler em português'),
  nav: {
    sobre: l('Sobre', 'About'),
    projetos: l('Projetos', 'Projects'),
    experiencia: l('Experiência', 'Experience'),
    formacao: l('Formação', 'Education'),
    habilidades: l('Habilidades', 'Skills'),
    contato: l('Contato', 'Contact'),
  },
  hero: {
    label: l('Apresentação', 'Introduction'),
    hello: l('Olá, eu sou', "Hi, I'm"),
    seeProjects: l('Ver projetos', 'See projects'),
    contact: l('Contato', 'Contact'),
    photoAlt: l('sorrindo', 'smiling'),
  },
  about: {
    eyebrow: l('Sobre', 'About'),
    title: l(
      'Desenvolvedor atualmente focado em plataformas de compliance bancário brasileiro',
      'Developer currently focused on Brazilian banking compliance platforms',
    ),
  },
  projects: {
    eyebrow: l('Projetos pessoais', 'Personal projects'),
    title: l('Destaques', 'Highlights'),
    seeAll: l('Ver todos', 'See all'),
    others: l('Outros', 'Others'),
    count: l('projetos', 'projects'),
    seeFull: l('Ver lista completa', 'See full list'),
    back: l('Voltar', 'Back'),
    pageTitle: l('Todos os projetos', 'All projects'),
    intro: l(
      'Aplicações web, ferramentas para desenvolvedores, alguns projetos de engenharia reversa e, por último, estudos.',
      'Web apps, developer tools, a few reverse engineering projects and, last, studies.',
    ),
    all: l('Todos', 'All'),
    filterBy: l('Filtrar por categoria', 'Filter by category'),
    tech: l('Tecnologias', 'Technologies'),
    imageOf: l('Imagem do projeto', 'Screenshot of'),
  },
  stack: {
    eyebrow: l('Stack', 'Stack'),
    title: l('Com o que trabalho no dia a dia', 'What I use day to day'),
  },
  experience: {
    eyebrow: l('Experiência', 'Experience'),
    title: l('Onde trabalhei', "Where I've worked"),
  },
  education: {
    eyebrow: l('Formação', 'Education'),
    title: l('Estudos e certificados', 'Studies and certificates'),
    certificates: l('Certificados', 'Certificates'),
    languages: l('Idiomas', 'Languages'),
  },
  skills: {
    eyebrow: l('Habilidades', 'Skills'),
    title: l('Com o que eu trabalho', 'What I work with'),
  },
  contact: {
    eyebrow: l('Contato', 'Contact'),
    title: l('Vamos conversar?', "Let's talk"),
    text: l(
      'Aberto a oportunidades e a trocar ideia sobre desenvolvimento web e cloud.',
      'Open to opportunities and happy to chat about web development and cloud.',
    ),
  },
  notFound: {
    eyebrow: l('Erro 404', 'Error 404'),
    title: l('Página não encontrada', 'Page not found'),
    text: l('O endereço pode ter mudado ou nunca ter existido.', 'This address may have moved or never existed.'),
    home: l('Ir para o início', 'Go to home page'),
    projects: l('Ver projetos', 'See projects'),
  },
  links: {
    repo: l('Repositório', 'Repository'),
    live: l('Abrir', 'Open'),
    video: l('Vídeo', 'Video'),
    download: l('Download', 'Download'),
  },
};
