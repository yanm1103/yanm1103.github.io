import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS, PROJECT_CATEGORIES, ProjectCategory } from '../../data/projects';
import { Icon } from '../../shared/icon';
import { ProjectCard } from '../../shared/project-card';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, Icon, ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="container">
        <a routerLink="/" fragment="projetos" class="back"><app-icon name="arrow-left" [size]="16" /> Voltar</a>
        <p class="eyebrow">Projetos pessoais</p>
        <h1 class="section-title">Todos os projetos</h1>
        <p class="intro">
          De ports de jogos de PS2 a extensões de VS Code e estudos de Angular. Os mais recentes aparecem primeiro.
        </p>

        <div class="filters" role="group" aria-label="Filtrar por categoria">
          <button type="button" [attr.aria-pressed]="filter() === null" (click)="filter.set(null)">
            Todos <span>{{ all.length }}</span>
          </button>
          @for (c of categories; track c.name) {
            <button type="button" [attr.aria-pressed]="filter() === c.name" (click)="filter.set(c.name)">
              {{ c.name }} <span>{{ c.count }}</span>
            </button>
          }
        </div>

        <div class="grid">
          @for (p of visible(); track p.slug) {
            <app-project-card [project]="p" />
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 24px;
      color: var(--muted);
      text-decoration: none;
      font-size: 0.92rem;
    }
    .back:hover {
      color: var(--accent);
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3rem);
    }
    .intro {
      margin-top: 12px;
      color: var(--muted);
      max-width: 60ch;
    }
    .filters {
      margin: 28px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .filters button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font: 500 0.9rem/1 var(--font-body);
      cursor: pointer;
    }
    .filters button span {
      font-size: 0.78rem;
      color: var(--muted);
    }
    .filters button[aria-pressed='true'] {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--on-accent);
    }
    .filters button[aria-pressed='true'] span {
      color: inherit;
      opacity: 0.8;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
      gap: 20px;
    }
  `,
})
export class Projects {
  protected readonly all = PROJECTS;
  protected readonly categories = PROJECT_CATEGORIES.map((name) => ({
    name,
    count: PROJECTS.filter((p) => p.category === name).length,
  })).filter((c) => c.count > 0);
  protected readonly filter = signal<ProjectCategory | null>(null);
  protected readonly visible = computed(() => {
    const f = this.filter();
    return f ? this.all.filter((p) => p.category === f) : this.all;
  });
}
