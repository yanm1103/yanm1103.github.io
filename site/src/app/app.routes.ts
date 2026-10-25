import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

const projects = () => import('./pages/projects/projects').then((m) => m.Projects);
const notFound = () => import('./pages/not-found/not-found').then((m) => m.NotFound);

export const routes: Routes = [
  // Português (padrão)
  { path: '', component: Home, title: 'Yan Moura · Desenvolvedor Fullstack' },
  { path: 'projetos', loadComponent: projects, title: 'Projetos · Yan Moura' },

  // English
  { path: 'en', component: Home, title: 'Yan Moura · Fullstack Developer' },
  { path: 'en/projects', loadComponent: projects, title: 'Projects · Yan Moura' },

  // "404" é pré-renderizada e vira o 404.html do GitHub Pages
  { path: '404', loadComponent: notFound, title: 'Página não encontrada · Yan Moura' },
  { path: 'en/**', loadComponent: notFound, title: 'Page not found · Yan Moura' },
  { path: '**', loadComponent: notFound, title: 'Página não encontrada · Yan Moura' },
];
