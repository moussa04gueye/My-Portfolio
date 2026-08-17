import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExperienceService } from '../../../core/services/experience.service';
import { EducationService } from '../../../core/services/education.service';
import { Experience, Education } from '../../../core/models/Experience';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, LoaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  private experienceService = inject(ExperienceService);
  private educationService = inject(EducationService);

  experiences = signal<Experience[]>([]);
  education = signal<Education[]>([]);
  isLoading = signal(true);
  cvUrl = '/cv.pdf';

  ngOnInit(): void {
    forkJoin({
      experiences: this.experienceService.getAll().pipe(
        catchError((error) => {
          console.error('Experiences load error:', error);
          return of({ data: [] as Experience[] });
        })
      ),
      education: this.educationService.getAll().pipe(
        catchError((error) => {
          console.error('Education load error:', error);
          return of({ data: [] as Education[] });
        })
      ),
    }).subscribe({
      next: ({ experiences, education }) => {
        this.experiences.set(experiences.data);
        this.education.set(education.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('About load error:', error);
        this.isLoading.set(false);
      },
    });
  }
}