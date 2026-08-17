import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminEducationService } from '../../../core/services/admin-education.service';
import { Education } from '../../../core/models/Experience';

@Component({
  selector: 'app-education-manage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education-manage.component.html',
  styleUrl: './education-manage.component.css',
})
export class EducationManageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminEducationService = inject(AdminEducationService);

  educations = signal<Education[]>([]);
  editingId = signal<number | null>(null);
  showForm = signal(false);

  form = this.fb.nonNullable.group({
    school: ['', Validators.required],
    degree: ['', Validators.required],
    field: [''],
    start_date: ['', Validators.required],
    end_date: [''],
    description: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adminEducationService.getAll().subscribe({ next: (res) => this.educations.set(res.data) });
  }

  newForm(): void {
    this.editingId.set(null);
    this.form.reset({ school: '', degree: '', field: '', start_date: '', end_date: '', description: '' });
    this.showForm.set(true);
  }

  edit(ed: Education): void {
    this.editingId.set(ed.id);
    this.form.setValue({
      school: ed.school,
      degree: ed.degree,
      field: ed.field ?? '',
      start_date: ed.start_date,
      end_date: ed.end_date ?? '',
      description: ed.description ?? '',
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
      ? this.adminEducationService.update(id, payload)
      : this.adminEducationService.create(payload);

    request.subscribe({
      next: () => {
        this.cancel();
        this.load();
      },
    });
  }

  remove(ed: Education): void {
    if (!confirm(`Supprimer "${ed.degree}" ?`)) return;
    this.adminEducationService.delete(ed.id).subscribe({ next: () => this.load() });
  }
}