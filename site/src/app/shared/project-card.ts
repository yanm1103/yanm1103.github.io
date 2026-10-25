import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project, ProjectLink } from '../data/projects';
import { IconName } from './icon';
import { Orb, OrbTone } from './orb';

const LINK_STYLE: Record<ProjectLink['kind'], { icon: IconName; tone: OrbTone }> = {
  repo: { icon: 'github', tone: 'blue' },
  live: { icon: 'external', tone: 'green' },
  video: { icon: 'play', tone: 'aqua' },
  download: { icon: 'download', tone: 'green' },
};

@Component({
  selector: 'app-project-card',
  imports: [Orb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let p = project();
    <article class="card glass">
      @if (p.image) {
        <div class="thumb">
          <img [src]="p.image" [alt]="'Imagem do projeto ' + p.name" loading="lazy" width="960" height="540" />
        </div>
      }
      <div class="body">
        <div class="meta">
          <span>{{ p.category }}</span>
          <span class="year">{{ p.year }}</span>
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
            <a [href]="l.url" target="_blank" rel="noopener">
              <app-orb [icon]="style(l.kind).icon" [tone]="style(l.kind).tone" [size]="30" />
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
      overflow: hidden;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow:
        0 16px 36px rgba(20, 110, 180, 0.22),
        0 2px 6px rgba(20, 110, 180, 0.1);
    }
    .thumb {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      margin: 8px 8px 0;
      border-radius: calc(var(--radius) - 8px);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    }
    .thumb::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 38%);
      pointer-events: none;
    }
    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card:hover .thumb img {
      transform: scale(1.04);
    }
    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 18px 20px 20px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.76rem;
      font-weight: 800;
      color: var(--accent-text);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .year {
      white-space: nowrap;
      color: var(--link);
    }
    h3 {
      font-size: 1.3rem;
      font-weight: 800;
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
      gap: 14px;
    }
    .links a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--link);
      text-decoration: none;
      border-radius: 999px;
      padding-right: 6px;
    }
    .links a:hover {
      text-decoration: underline;
    }
    .links a:hover app-orb {
      transform: scale(1.08);
    }
    app-orb {
      transition: transform 0.15s ease;
    }
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  protected style(kind: ProjectLink['kind']) {
    return LINK_STYLE[kind];
  }
}
