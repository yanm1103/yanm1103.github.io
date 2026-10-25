import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project, ProjectLink } from '../data/projects';
import { Icon, IconName } from './icon';

const LINK_ICON: Record<ProjectLink['kind'], IconName> = {
  repo: 'github',
  live: 'external',
  video: 'play',
  download: 'download',
};

@Component({
  selector: 'app-project-card',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let p = project();
    <article class="card" [class.has-image]="!!p.image">
      @if (p.image) {
        <div class="thumb">
          <img [src]="p.image" [alt]="'Imagem do projeto ' + p.name" loading="lazy" width="960" height="540" />
        </div>
      }
      <div class="body">
        <div class="meta">
          <span>{{ p.category }}</span>
          <span>{{ p.year }}</span>
        </div>
        <h3>{{ p.name }}</h3>
        <p class="summary">{{ p.summary }}</p>
        <ul class="tags" aria-label="Tecnologias">
          @for (t of p.tags; track t) {
            <li class="chip">{{ t }}</li>
          }
        </ul>
        <div class="links">
          @for (l of p.links; track l.url) {
            <a [href]="l.url" target="_blank" rel="noopener" [class.primary]="$first">
              <app-icon [name]="icon(l.kind)" [size]="16" />
              {{ l.label }}
            </a>
          }
        </div>
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }
    .card {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      transition:
        transform 0.2s ease,
        border-color 0.2s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
    }
    .thumb {
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: var(--surface-2);
      border-bottom: 1px solid var(--border);
    }
    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card:hover .thumb img {
      transform: scale(1.03);
    }
    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.78rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .meta span:last-child {
      white-space: nowrap;
    }
    h3 {
      font-size: 1.25rem;
    }
    .summary {
      color: var(--muted);
      font-size: 0.95rem;
    }
    .tags {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .links {
      margin-top: auto;
      padding-top: 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .links a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      font-size: 0.88rem;
      font-weight: 600;
      text-decoration: none;
      transition: border-color 0.15s ease;
    }
    .links a:hover {
      border-color: var(--accent);
    }
    .links a.primary {
      background: var(--accent-soft);
      border-color: transparent;
      color: var(--accent);
    }
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  protected icon(kind: ProjectLink['kind']) {
    return LINK_ICON[kind];
  }
}
