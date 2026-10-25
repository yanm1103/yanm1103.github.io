import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type FishKind = 'clown' | 'magikarp' | 'angel';

export interface FishSpec {
  kind: FishKind;
  /** Altura na tela (ex.: '30%'). */
  top: string;
  /** Largura em px. */
  size: number;
  /** Segundos para atravessar a tela. */
  dur: number;
  /** Atraso negativo: o peixe já começa no meio do caminho. */
  delay: number;
  /** 1 = nada para a direita, -1 = para a esquerda. */
  dir: 1 | -1;
  opacity?: number;
}

let nextId = 0;

// Peixes brilhantes (estilo Frutiger Aero) nadando de um lado ao outro.
@Component({
  selector: 'app-fish-school',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @for (f of fish(); track $index; let i = $index) {
      @let id = uid + '-' + i;
      <span
        class="swim"
        [class.left]="f.dir === -1"
        [style.top]="f.top"
        [style.width.px]="f.size"
        [style.opacity]="f.opacity ?? 1"
        [style.--dur]="f.dur + 's'"
        [style.--delay]="f.delay + 's'"
        [style.--bob]="(2.4 + (i % 3) * 0.7) + 's'"
      >
        <span class="bob">
          @switch (f.kind) {
            @case ('clown') {
              <svg viewBox="0 0 120 70">
                <defs>
                  <radialGradient [attr.id]="id + 'b'" cx="0.62" cy="0.3" r="0.75">
                    <stop offset="0" stop-color="#ffe0a0" />
                    <stop offset="0.45" stop-color="#ff8a1f" />
                    <stop offset="1" stop-color="#d94a00" />
                  </radialGradient>
                  <clipPath [attr.id]="id + 'c'"><ellipse cx="66" cy="35" rx="38" ry="24" /></clipPath>
                </defs>
                <g class="tail">
                  <path d="M34 35 L6 13 Q13 35 6 57 Z" [attr.fill]="'url(#' + id + 'b)'" />
                </g>
                <path d="M48 15 Q64 -2 86 13 Z" fill="#ff9a35" />
                <path d="M54 55 Q64 68 76 56 Z" fill="#ff9a35" />
                <ellipse cx="66" cy="35" rx="38" ry="24" [attr.fill]="'url(#' + id + 'b)'" />
                <g [attr.clip-path]="'url(#' + id + 'c)'" fill="#fff" stroke="#5a2400" stroke-opacity="0.35" stroke-width="1.5">
                  <path d="M80 8 C 76 25, 76 45, 80 62 L 89 62 C 85 45, 85 25, 89 8 Z" />
                  <path d="M56 8 C 53 25, 53 45, 56 62 L 65 62 C 62 45, 62 25, 65 8 Z" />
                  <path d="M33 8 L 40 8 C 38 25, 38 45, 40 62 L 33 62 Z" />
                </g>
                <ellipse cx="68" cy="22" rx="24" ry="7" fill="#fff" opacity="0.45" />
                <circle cx="94" cy="30" r="5" fill="#fff" />
                <circle cx="95" cy="30" r="2.8" fill="#14202b" />
              </svg>
            }
            @case ('magikarp') {
              <svg viewBox="0 0 120 92">
                <defs>
                  <radialGradient [attr.id]="id + 'b'" cx="0.62" cy="0.3" r="0.8">
                    <stop offset="0" stop-color="#ffb784" />
                    <stop offset="0.45" stop-color="#f2551d" />
                    <stop offset="1" stop-color="#c22e0b" />
                  </radialGradient>
                </defs>
                <!-- cauda branca com borda vermelha -->
                <g class="tail">
                  <path d="M36 50 C 26 36, 14 24, 2 20 C 9 38, 9 62, 4 82 C 15 74, 27 62, 36 54 Z" fill="#fff" stroke="#e8401c" stroke-width="2" stroke-linejoin="round" />
                  <path d="M30 51 L 8 30 M30 52 L 6 52 M30 53 L 8 72" stroke="#c9ccd4" stroke-width="1" />
                </g>
                <!-- coroa de 3 pontas e nadadeira de baixo, amarelas -->
                <path d="M54 24 L50 6 L59 15 L65 2 L70 15 L79 8 L77 24 Z" fill="#f7e65a" stroke="#dcc23a" stroke-width="1.2" stroke-linejoin="round" />
                <path d="M56 74 L52 88 L60 82 L64 91 L68 81 L75 85 L73 74 Z" fill="#f7e65a" stroke="#dcc23a" stroke-width="1.2" stroke-linejoin="round" />
                <ellipse cx="68" cy="49" rx="34" ry="30" [attr.fill]="'url(#' + id + 'b)'" />
                <!-- escamas -->
                <g fill="none" stroke="#a8280a" stroke-opacity="0.35" stroke-width="1.2">
                  <path d="M56 40 q6 6 0 12 M66 36 q6 6 0 12 M60 54 q6 6 0 12 M70 50 q6 6 0 12" />
                </g>
                <!-- nadadeira lateral branca -->
                <path d="M74 51 L 40 40 C 46 53, 57 61, 73 58 Z" fill="#fff" stroke="#e8401c" stroke-width="1.5" stroke-linejoin="round" />
                <path d="M72 53 L 48 46 M72 55 L 52 54" stroke="#c9ccd4" stroke-width="1" />
                <ellipse cx="66" cy="30" rx="18" ry="6" fill="#fff" opacity="0.35" />
                <!-- olho grande com pupila bem pequena -->
                <circle cx="82" cy="38" r="9" fill="#fff" stroke="#7a2a10" stroke-width="1.2" />
                <circle cx="83" cy="38" r="1.5" fill="#111" />
                <!-- boca larga rosa -->
                <ellipse cx="102" cy="50" rx="6.5" ry="11" fill="#f27da2" stroke="#c9496f" stroke-width="1" />
                <ellipse cx="103.5" cy="50" rx="3" ry="7" fill="#a92c4c" />
                <!-- bigode amarelo -->
                <g fill="none" stroke="#f5e66a" stroke-width="3" stroke-linecap="round">
                  <path d="M99 59 C 96 69, 102 77, 96 89" />
                  <path d="M95 60 C 88 70, 93 80, 86 90" />
                </g>
              </svg>
            }
            @case ('angel') {
              <svg viewBox="0 0 120 80">
                <defs>
                  <linearGradient [attr.id]="id + 'b'" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#e4ffc8" />
                    <stop offset="0.5" stop-color="#5fd36a" />
                    <stop offset="1" stop-color="#16856a" />
                  </linearGradient>
                  <linearGradient [attr.id]="id + 'f'" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0" stop-color="#7fe3d0" stop-opacity="0.95" />
                    <stop offset="1" stop-color="#7fd0ff" stop-opacity="0.35" />
                  </linearGradient>
                </defs>
                <g class="tail">
                  <path d="M34 40 L10 24 Q15 40 10 56 Z" [attr.fill]="'url(#' + id + 'f)'" />
                </g>
                <path d="M84 22 C 64 10, 42 2, 24 3 C 40 14, 48 22, 52 30 Z" [attr.fill]="'url(#' + id + 'f)'" />
                <path d="M84 58 C 64 70, 42 78, 24 77 C 40 66, 48 58, 52 50 Z" [attr.fill]="'url(#' + id + 'f)'" />
                <path d="M30 40 C 44 16, 80 10, 106 36 C 110 40, 108 44, 104 47 C 80 70, 44 64, 30 40 Z" [attr.fill]="'url(#' + id + 'b)'" />
                <g fill="none" stroke="#0e5c48" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round">
                  <path d="M56 22 Q53 40 56 58" />
                  <path d="M74 19 Q71 40 74 60" />
                </g>
                <ellipse cx="72" cy="26" rx="22" ry="6" fill="#fff" opacity="0.5" />
                <circle cx="95" cy="36" r="4.6" fill="#fff" />
                <circle cx="96" cy="36" r="2.6" fill="#14202b" />
              </svg>
            }
          }
        </span>
      </span>
    }
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      display: block;
      overflow: hidden;
      pointer-events: none;
    }
    .swim {
      position: absolute;
      left: 0;
      animation: swim var(--dur) linear var(--delay) infinite;
      will-change: transform;
    }
    .swim.left {
      animation-direction: reverse;
    }
    .swim.left svg {
      transform: scaleX(-1);
    }
    .bob {
      display: block;
      animation: bob var(--bob) ease-in-out infinite alternate;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
      filter: drop-shadow(0 6px 10px rgba(10, 60, 110, 0.25));
    }
    .tail {
      transform-box: fill-box;
      transform-origin: 100% 50%;
      animation: wag 0.7s ease-in-out infinite alternate;
    }
    @keyframes swim {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(100vw);
      }
    }
    @keyframes bob {
      from {
        transform: translateY(-7px);
      }
      to {
        transform: translateY(7px);
      }
    }
    @keyframes wag {
      from {
        transform: rotate(-12deg);
      }
      to {
        transform: rotate(12deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .swim,
      .bob,
      .tail {
        animation-play-state: paused;
      }
    }
  `,
})
export class FishSchool {
  readonly fish = input.required<FishSpec[]>();
  protected readonly uid = 'fish' + nextId++;
}
