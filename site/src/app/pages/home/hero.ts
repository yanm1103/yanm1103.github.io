import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESUME } from '../../data/resume';
import { LangService, TrPipe, UI } from '../../i18n';
import { Icon } from '../../shared/icon';
import { FishSchool, FishSpec } from '../../shared/fish';
import { Orb } from '../../shared/orb';

interface Tower {
  d: string;
  x: number;
  w: number;
  top: number;
  tone: 'a' | 'b';
  antenna?: boolean;
}

const BASE = 730;

// Prédios de vidro do banner (coordenadas no viewBox 1600x900).
function towers(): Tower[] {
  const spec: [number, number, number, 'flat' | 'dome' | 'slant' | 'spire', 'a' | 'b'][] = [
    [40, 90, 300, 'flat', 'b'],
    [140, 120, 450, 'dome', 'a'],
    [275, 80, 360, 'flat', 'b'],
    [370, 140, 540, 'slant', 'a'],
    [525, 95, 400, 'flat', 'b'],
    [635, 120, 620, 'spire', 'a'],
    [770, 100, 430, 'flat', 'b'],
    [885, 150, 500, 'dome', 'a'],
    [1050, 90, 350, 'flat', 'b'],
    [1155, 130, 580, 'slant', 'a'],
    [1300, 100, 420, 'flat', 'b'],
    [1415, 120, 490, 'dome', 'a'],
    [1550, 90, 330, 'flat', 'b'],
  ];
  return spec.map(([x, w, h, cap, tone]) => {
    const top = BASE - h;
    let d: string;
    switch (cap) {
      case 'dome':
        d = `M${x} ${top + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${top + w / 2} V${BASE} H${x} Z`;
        break;
      case 'slant':
        d = `M${x} ${top + 50} L${x + w} ${top} V${BASE} H${x} Z`;
        break;
      default:
        d = `M${x} ${top} H${x + w} V${BASE} H${x} Z`;
    }
    return { d, x, w, top, tone, antenna: cap === 'spire' };
  });
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon, Orb, FishSchool, TrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly i18n = inject(LangService);
  protected readonly lang = this.i18n.lang;
  protected readonly ui = UI;
  protected readonly r = RESUME;
  protected readonly towers = towers();
  protected readonly fish: FishSpec[] = [
    { kind: 'clown', top: '14%', size: 64, dur: 34, delay: -6, dir: 1 },
    { kind: 'magikarp', top: '30%', size: 78, dur: 42, delay: -25, dir: -1 },
    { kind: 'angel', top: '8%', size: 56, dur: 50, delay: -38, dir: 1, opacity: 0.9 },
    { kind: 'clown', top: '46%', size: 44, dur: 30, delay: -18, dir: -1, opacity: 0.85 },
  ];
  protected readonly trees = [
    { x: 120, y: 668, r: 26 },
    { x: 168, y: 676, r: 18 },
    { x: 560, y: 690, r: 22 },
    { x: 980, y: 662, r: 28 },
    { x: 1022, y: 672, r: 18 },
    { x: 1490, y: 650, r: 24 },
  ];

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);

    // Parallax: cada camada desce numa velocidade diferente ao rolar a página.
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let queued = false;
      const update = () => {
        queued = false;
        const y = Math.min(window.scrollY, host.offsetHeight);
        host.style.setProperty('--sy', String(y));
      };
      const onScroll = () => {
        if (!queued) {
          queued = true;
          requestAnimationFrame(update);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
