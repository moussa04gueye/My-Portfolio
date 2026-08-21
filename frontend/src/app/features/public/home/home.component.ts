import { Component, OnDestroy, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { SkillService } from '../../../core/services/skill.service';
import { Project, Skill } from '../../../core/models/Project';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SectionTitleComponent,
    BadgeComponent,
    LoaderComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {

  private projectService = inject(ProjectService);
  private skillService = inject(SkillService);
  private photoTimer?: number;

  featuredProjects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  searchTerm = signal('');
  filteredSkills = computed(() => {
    const q = this.searchTerm().trim().toLowerCase();
    if (!q) return this.skills();
    return this.skills().filter((s) => (s.name || '').toLowerCase().includes(q));
  });
  isLoading = signal(true);
  activeIndex = signal(0);
  photos = ['Profil.jpeg', 'prof2.jpeg', 'prof5.jpeg'];
  cvUrl = '/cv.pdf';

  ngOnInit(): void {
    this.projectService.getAll(true).subscribe({
      next: (res) => this.featuredProjects.set(res.data),
      error: () => this.featuredProjects.set([]),
    });

    this.skillService.getAll().subscribe({
      next: (res) => {
        this.skills.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });

    this.photoTimer = window.setInterval(() => {
      this.activeIndex.update((index) => (index + 1) % this.photos.length);
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.photoTimer) {
      window.clearInterval(this.photoTimer);
    }
  }
}
