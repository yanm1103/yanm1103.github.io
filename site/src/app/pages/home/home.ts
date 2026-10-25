import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { RESUME } from '../../data/resume';
import { LangService, TrPipe, UI } from '../../i18n';
import { Icon, IconName } from '../../shared/icon';
import { FishSchool, FishSpec } from '../../shared/fish';
import { Orb } from '../../shared/orb';
import { ProjectCard } from '../../shared/project-card';
import { Hero } from './hero';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, Orb, ProjectCard, Hero, FishSchool, TrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly i18n = inject(LangService);
  protected readonly lang = this.i18n.lang;
  protected readonly ui = UI;
  protected readonly r = RESUME;
  protected readonly featured = PROJECTS.filter((p) => p.featured);
  protected readonly others = PROJECTS.filter((p) => !p.featured);
  protected readonly stackFish: FishSpec[] = [
    { kind: 'magikarp', top: '22%', size: 54, dur: 38, delay: -14, dir: -1, opacity: 0.7 },
    { kind: 'clown', top: '72%', size: 40, dur: 30, delay: -4, dir: 1, opacity: 0.7 },
  ];
  protected readonly highlightIcons: IconName[] = ['calendar', 'briefcase', 'cap'];
}
