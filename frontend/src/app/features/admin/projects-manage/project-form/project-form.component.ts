import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminProjectService } from '../../../../core/services/admin-project.service';
import { SkillService } from '../../../../core/services/skill.service';
import { Skill } from '../../../../core/models/Project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminProjectService = inject(AdminProjectService);
  private skillService = inject(SkillService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projectId = signal<number | null>(null);
  isEditMode = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  allSkills = signal<Skill[]>([]);
  coverPreview = signal<string | null>(null);
  selectedFile: File | null = null;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    summary: ['', [Validators.required, Validators.maxLength(500)]],
    description: ['', [Validators.required]],
    stackInput: [''], 
    repo_url: [''],
    demo_url: [''],
    is_featured: [false],
    status: ['draft' as 'draft' | 'published', [Validators.required]],
    skill_ids: this.fb.nonNullable.control<number[]>([]),
  });

  ngOnInit(): void {
    this.skillService.getAll().subscribe({ next: (res) => this.allSkills.set(res.data) });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.projectId.set(id);
      this.isEditMode.set(true);

      this.adminProjectService.getOne(id).subscribe({
        next: (res) => {
          const p = res.data;
          this.form.patchValue({
            title: p.title,
            summary: p.summary,
            description: p.description,
            stackInput: (p.stack ?? []).join(', '),
            repo_url: p.repo_url ?? '',
            demo_url: p.demo_url ?? '',
            is_featured: p.is_featured,
            status: p.status,
            skill_ids: p.skills.map((s) => s.id),
          });
          if (p.cover_image) this.coverPreview.set(p.cover_image);
        },
      });
    }
  }

  toggleSkill(skillId: number, checked: boolean): void {
    const current = this.form.controls.skill_ids.value;
    if (checked) {
      this.form.controls.skill_ids.setValue([...current, skillId]);
    } else {
      this.form.controls.skill_ids.setValue(current.filter((id) => id !== skillId));
    }
  }

  isSkillChecked(skillId: number): boolean {
    return this.form.controls.skill_ids.value.includes(skillId);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => this.coverPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();
    const stack = raw.stackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: raw.title,
      summary: raw.summary,
      description: raw.description,
      stack,
      repo_url: raw.repo_url || undefined,
      demo_url: raw.demo_url || undefined,
      cover_image: this.selectedFile,
      is_featured: raw.is_featured,
      status: raw.status,
      skill_ids: raw.skill_ids,
    };

    const id = this.projectId();
    const request = this.isEditMode() && id
      ? this.adminProjectService.update(id, payload)
      : this.adminProjectService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/admin/projets']),
      error: () => {
        this.errorMessage.set("Une erreur est survenue lors de l'enregistrement.");
        this.isSubmitting.set(false);
      },
    });
  }
}