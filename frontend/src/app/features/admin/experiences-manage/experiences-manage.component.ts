import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminExperienceService } from '../../../core/services/admin-experience.service';
import { Experience } from '../../../core/models/Experience';

@Component({
  selector: 'app-experiences-manage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './experiences-manage.component.html',
  styleUrl: './experiences-manage.component.css',
})
export class ExperiencesManageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminExperienceService = inject(AdminExperienceService);

  experiences = signal<Experience[]>([]);
  editingId = signal<number | null>(null);
  showForm = signal(false);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    location: [''],
    start_date: ['', Validators.required],
    end_date: [''],
    type: ['stage' as 'stage' | 'emploi' | 'projet', Validators.required],
    description: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adminExperienceService.getAll().subscribe({ next: (res) => this.experiences.set(res.data) });
  }

  newForm(): void {
    this.editingId.set(null);
    this.form.reset({ title: '', company: '', location: '', start_date: '', end_date: '', type: 'stage', description: '' });
    this.showForm.set(true);
  }

  edit(exp: Experience): void {
    this.editingId.set(exp.id);
    this.form.setValue({
      title: exp.title,
      company: exp.company,
      location: exp.location ?? '',
      start_date: exp.start_date,
      end_date: exp.end_date ?? '',
      type: exp.type,
      description: exp.description ?? '',
    });
    this.showForm.set(true);
  }

  cancel(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const payload = { ...raw, end_date: raw.end_date || null };
    const id = this.editingId();

    const request = id
      ? this.adminExperienceService.update(id, payload)
      : this.adminExperienceService.create(payload);

    request.subscribe({
      next: () => {
        this.cancel();
        this.load();
      },
    });
  }

  remove(exp: Experience): void {
    if (!confirm(`Supprimer "${exp.title}" ?`)) return;
    this.adminExperienceService.delete(exp.id).subscribe({ next: () => this.load() });
  }
}