import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService, TrPipe, UI } from '../../i18n';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section page-top">
      <div class="container wrap">
        <p class="eyebrow">{{ ui.notFound.eyebrow | tr: lang() }}</p>
        <h1 class="section-title">{{ ui.notFound.title | tr: lang() }}</h1>
        <p>{{ ui.notFound.text | tr: lang() }}</p>
        <div class="cta">
          <a [routerLink]="i18n.paths().home" class="btn primary">{{ ui.notFound.home | tr: lang() }}</a>
          <a [routerLink]="i18n.paths().projects" class="btn">{{ ui.notFound.projects | tr: lang() }}</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .wrap {
      min-height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
    }
    p:not(.eyebrow) {
      color: var(--muted);
    }
    .cta {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  `,
})
export class NotFound {
  protected readonly i18n = inject(LangService);
  protected readonly lang = this.i18n.lang;
  protected readonly ui = UI;
}
