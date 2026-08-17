import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminProjectService } from '../../../../core/services/admin-project.service';
import { Project } from '../../../../core/models/Project';

@Component({
  selector: 'app-project-list-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list-admin.component.html',
  styleUrl: './project-list-admin.component.css',
})
export class ProjectListAdminComponent implements OnInit {
  private adminProjectService = inject(AdminProjectService);

  projects = signal<Project[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.adminProjectService.getAll().subscribe({
      next: (res) => {
        this.projects.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  remove(project: Project): void {
    if (!confirm(`Supprimer le projet "${project.title}" ? Cette action est irréversible.`)) {
      return;
    }
    this.adminProjectService.delete(project.id).subscribe({
      next: () => this.load(),
    });
  }
}