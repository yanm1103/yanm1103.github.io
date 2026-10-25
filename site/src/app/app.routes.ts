import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Yan Moura · Desenvolvedor Fullstack' },
  {
    path: 'projetos',
    loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
    title: 'Projetos · Yan Moura',
  },
  // "404" é pré-renderizada e vira o 404.html do GitHub Pages
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Página não encontrada · Yan Moura',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Página não encontrada · Yan Moura',
  },
];
