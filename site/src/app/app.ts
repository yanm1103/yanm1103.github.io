import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RESUME } from './data/resume';
import { LangService, TrPipe, UI } from './i18n';
import { FishSchool, FishSpec } from './shared/fish';
import { Orb } from './shared/orb';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Orb, FishSchool, TrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  protected readonly i18n = inject(LangService);
  protected readonly lang = this.i18n.lang;
  protected readonly ui = UI;
  protected readonly r = RESUME;
  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly theme = signal<Theme>('dark');

  // Peixes nadando no fundo de todas as páginas
  protected readonly fish: FishSpec[] = [
    { kind: 'angel', top: '18%', size: 110, dur: 70, delay: -12, dir: 1, opacity: 0.55 },
    { kind: 'clown', top: '38%', size: 70, dur: 48, delay: -30, dir: -1, opacity: 0.6 },
    { kind: 'tang', top: '58%', size: 96, dur: 62, delay: -5, dir: 1, opacity: 0.55 },
    { kind: 'clown', top: '76%', size: 52, dur: 40, delay: -22, dir: 1, opacity: 0.5 },
    { kind: 'tang', top: '86%', size: 64, dur: 55, delay: -44, dir: -1, opacity: 0.5 },
    { kind: 'angel', top: '68%', size: 74, dur: 66, delay: -50, dir: -1, opacity: 0.45 },
  ];

  protected readonly nav = (['sobre', 'projetos', 'experiencia', 'formacao', 'habilidades', 'contato'] as const).map(
    (fragment) => ({ fragment, label: UI.nav[fragment] }),
  );

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.menuOpen.set(false);
    });

    // só no navegador: descobre o tema atual (salvo ou do sistema)
    afterNextRender(() => {
      const saved = this.doc.documentElement.getAttribute('data-theme') as Theme | null;
      const prefersDark = this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(saved ?? (prefersDark ? 'dark' : 'light'));
    });
  }

  protected switchLang(event: MouseEvent) {
    // deixa abrir em nova aba com Ctrl/Cmd+clique
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    this.router.navigateByUrl(this.i18n.alternate());
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
