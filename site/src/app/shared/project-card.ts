import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CATEGORY_LABEL, Project, ProjectLink } from '../data/projects';
import { LangService, TrPipe, UI } from '../i18n';
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
  imports: [Orb, TrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let p = project();
    <article class="card glass">
      @if (p.image) {
        <div class="thumb" [class.has-logo]="p.logo">
          <img class="shot" [src]="p.image" [alt]="(ui.projects.imageOf | tr: lang()) + ' ' + (p.name | tr: lang())" loading="lazy" width="960" height="540" />
          @if (p.logo) {
            <img class="logo" [src]="p.logo" alt="" loading="lazy" width="900" height="346" />
          }
        </div>
      }
      <div class="body">
        <div class="meta">
          <span>{{ categories[p.category] | tr: lang() }}</span>
          <span class="year">{{ p.year }}</span>
        </div>
        <h3>{{ p.name | tr: lang() }}</h3>
        <p class="summary">{{ p.summary | tr: lang() }}</p>
        <ul class="tags" [attr.aria-label]="ui.projects.tech | tr: lang()">
          @for (t of p.tags; track $index) {
            <li class="chip">{{ t | tr: lang() }}</li>
          }
        </ul>
        <div class="links">
          @for (l of p.links; track l.url) {
            <a [href]="l.url" target="_blank" rel="noopener">
              <app-orb [icon]="style(l.kind).icon" [tone]="style(l.kind).tone" [size]="30" />
              {{ ui.links[l.kind] | tr: lang() }}
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
    .shot {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card:hover .shot {
      transform: scale(1.04);
    }
    .has-logo .shot {
      filter: brightness(0.6) saturate(1.1);
    }
    .logo {
      position: absolute;
      z-index: 1;
      inset: 0;
      margin: auto;
      width: 82%;
      height: auto;
      filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.5));
      transition: transform 0.4s ease;
    }
    .card:hover .logo {
      transform: scale(1.03);
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
  protected readonly lang = inject(LangService).lang;
  protected readonly ui = UI;
  protected readonly categories = CATEGORY_LABEL;
  protected style(kind: ProjectLink['kind']) {
    return LINK_STYLE[kind];
  }
}
