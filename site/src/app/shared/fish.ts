import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type FishKind = 'clown' | 'tang' | 'angel';

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
            @case ('tang') {
              <svg viewBox="0 0 120 70">
                <defs>
                  <radialGradient [attr.id]="id + 'b'" cx="0.6" cy="0.3" r="0.8">
                    <stop offset="0" stop-color="#bfeaff" />
                    <stop offset="0.45" stop-color="#2a93ea" />
                    <stop offset="1" stop-color="#0b4a9a" />
                  </radialGradient>
                </defs>
                <g class="tail">
                  <path d="M24 35 L3 15 Q9 35 3 55 Z" fill="#ffd23a" />
                </g>
                <path d="M34 18 Q62 -2 96 18 Q66 12 34 22 Z" fill="#1a6fc8" />
                <path d="M34 52 Q62 70 92 52 Q66 58 34 48 Z" fill="#1a6fc8" />
                <path d="M20 35 C 32 8, 82 2, 108 30 C 112 35, 110 39, 106 42 C 82 66, 32 62, 20 35 Z" [attr.fill]="'url(#' + id + 'b)'" />
                <path d="M38 24 C 58 14, 86 18, 98 32 C 82 27, 62 30, 48 45 C 40 40, 35 32, 38 24 Z" fill="#082a5c" opacity="0.65" />
                <ellipse cx="66" cy="18" rx="26" ry="6" fill="#fff" opacity="0.4" />
                <path d="M70 40 Q78 50 66 52 Z" fill="#ffd23a" opacity="0.9" />
                <circle cx="96" cy="31" r="4.6" fill="#fff" />
                <circle cx="97" cy="31" r="2.6" fill="#14202b" />
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
