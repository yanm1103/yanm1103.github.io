import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { RESUME } from '../../data/resume';
import { Icon } from '../../shared/icon';
import { ProjectCard } from '../../shared/project-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly r = RESUME;
  protected readonly featured = PROJECTS.filter((p) => p.featured);
  protected readonly others = PROJECTS.filter((p) => !p.featured);
}
