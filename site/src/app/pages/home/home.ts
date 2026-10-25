import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { RESUME } from '../../data/resume';
import { Icon, IconName } from '../../shared/icon';
import { Orb } from '../../shared/orb';
import { ProjectCard } from '../../shared/project-card';
import { Hero } from './hero';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, Orb, ProjectCard, Hero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly r = RESUME;
  protected readonly featured = PROJECTS.filter((p) => p.featured);
  protected readonly others = PROJECTS.filter((p) => !p.featured);
  protected readonly highlightIcons: IconName[] = ['calendar', 'briefcase', 'sparkle'];
}
