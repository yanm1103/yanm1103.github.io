import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RESUME } from './data/resume';
import { Icon } from './shared/icon';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly doc = inject(DOCUMENT);
  protected readonly r = RESUME;
  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly theme = signal<Theme>('dark');

  protected readonly nav = [
    { label: 'Sobre', fragment: 'sobre' },
    { label: 'Projetos', fragment: 'projetos' },
    { label: 'Experiência', fragment: 'experiencia' },
    { label: 'Formação', fragment: 'formacao' },
    { label: 'Habilidades', fragment: 'habilidades' },
    { label: 'Contato', fragment: 'contato' },
  ];

  constructor() {
    inject(Router).events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.menuOpen.set(false);
    });

    // só no navegador: descobre o tema atual (salvo ou do sistema)
    afterNextRender(() => {
      const saved = this.doc.documentElement.getAttribute('data-theme') as Theme | null;
      const prefersDark = this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(saved ?? (prefersDark ? 'dark' : 'light'));
    });
  }

  protected toggleTheme() {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.doc.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // armazenamento bloqueado: o tema vale só para esta visita
    }
  }
}
