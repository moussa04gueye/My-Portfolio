import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/Project';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent, LoaderComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  project = signal<Project | null>(null);
  isLoading = signal(true);
  notFound = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.projectService.getBySlug(slug).subscribe({
      next: (res) => {
        this.project.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.isLoading.set(false);
      },
    });
  }
}