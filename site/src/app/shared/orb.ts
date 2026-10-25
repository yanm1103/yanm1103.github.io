import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from './icon';

export type OrbTone = 'green' | 'blue' | 'aqua' | 'glass';

// Ícone dentro de uma bolha 3D brilhante (estilo Frutiger Aero).
@Component({
  selector: 'app-orb',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[class]': "'orb ' + tone()",
    '[style.--size.px]': 'size()',
  },
  template: `<app-icon [name]="icon()" [size]="iconSize()" />`,
  styles: `
    :host {
      --size: 40px;
      --c1: var(--green-1);
      --c2: var(--green-2);
      --c3: var(--green-3);
      --glow: rgba(62, 168, 30, 0.45);
      position: relative;
      flex: none;
      display: inline-grid;
      place-items: center;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      color: #fff;
      background:
        radial-gradient(circle at 50% 115%, rgba(255, 255, 255, 0.65), transparent 45%),
        radial-gradient(circle at 50% 35%, var(--c1), var(--c2) 60%, var(--c3));
      box-shadow:
        0 calc(var(--size) * 0.1) calc(var(--size) * 0.3) var(--glow),
        inset 0 calc(var(--size) * -0.06) calc(var(--size) * 0.12) rgba(0, 0, 0, 0.18),
        inset 0 0 0 1px rgba(255, 255, 255, 0.45);
    }
    :host::before {
      content: '';
      position: absolute;
      top: 5%;
      left: 16%;
      right: 16%;
      height: 46%;
      border-radius: 50% 50% 45% 45% / 60% 60% 40% 40%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.12));
      pointer-events: none;
    }
    :host ::ng-deep app-icon {
      position: relative;
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.35));
    }
    :host(.blue) {
      --c1: var(--blue-1);
      --c2: var(--blue-2);
      --c3: var(--blue-3);
      --glow: rgba(31, 134, 224, 0.42);
    }
    :host(.aqua) {
      --c1: var(--aqua-1);
      --c2: var(--aqua-2);
      --c3: #0a7b93;
      --glow: rgba(19, 169, 194, 0.42);
    }
    :host(.glass) {
      --c1: #ffffff;
      --c2: #d6ecfa;
      --c3: #9ccbea;
      --glow: rgba(20, 110, 180, 0.25);
      color: #0f5fb0;
    }
    :host(.glass) ::ng-deep app-icon {
      filter: none;
    }
  `,
})
export class Orb {
  readonly icon = input.required<IconName>();
  readonly tone = input<OrbTone>('green');
  readonly size = input(40);
  protected iconSize() {
    return Math.round(this.size() * 0.48);
  }
}
