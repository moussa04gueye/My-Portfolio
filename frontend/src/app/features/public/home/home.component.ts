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
  photos = ['Profil.jpeg', 'prof2.jpeg','P111.png'];
  cvUrl = '/Cv-2.pdf';
  typedText = signal('');

  private readonly heroText = 'Je sécurise, automatise et déploie des infrastructures fiables.';
  private typeTimeout?: number;
  private typeIndex = 0;
  private isDeleting = false;

  private startTypewriter(): void {
    const speed = this.isDeleting ? 45 : 95;

    this.typeTimeout = window.setTimeout(() => {
      if (!this.isDeleting) {
        this.typeIndex += 1;
        this.typedText.set(this.heroText.slice(0, this.typeIndex));

        if (this.typeIndex >= this.heroText.length) {
          this.isDeleting = true;
          this.typeTimeout = window.setTimeout(() => this.startTypewriter(), 1200);
          return;
        }
      } else {
        this.typeIndex -= 1;
        this.typedText.set(this.heroText.slice(0, this.typeIndex));

        if (this.typeIndex <= 0) {
          this.isDeleting = false;
        }
      }

      this.startTypewriter();
    }, speed);
  }

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

    if (this.typeTimeout) {
      window.clearTimeout(this.typeTimeout);
    }
  }

  private initializeHeroText(): void {
    this.typedText.set('');
    this.typeIndex = 0;
    this.isDeleting = false;
    this.startTypewriter();
  }

  constructor() {
    this.initializeHeroText();
  }
}