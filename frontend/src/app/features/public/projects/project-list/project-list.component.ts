import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/Project';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionTitleComponent, BadgeComponent, LoaderComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (res) => {
        this.projects.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}