import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../../core/services/experience.service';
import { Experience } from '../../../core/models/Experience';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, LoaderComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent implements OnInit {
  private experienceService = inject(ExperienceService);

  experiences = signal<Experience[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.experienceService.getAll().subscribe({
      next: (res) => {
        this.experiences.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}
