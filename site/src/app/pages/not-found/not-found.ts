import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="container wrap">
        <p class="eyebrow">Erro 404</p>
        <h1 class="section-title">Página não encontrada</h1>
        <p>O endereço pode ter mudado ou nunca ter existido.</p>
        <div class="cta">
          <a routerLink="/" class="btn primary">Ir para o início</a>
          <a routerLink="/projetos" class="btn">Ver projetos</a>
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
export class NotFound {}
