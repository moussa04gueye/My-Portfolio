import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminSkillService } from '../../../core/services/admin-skill.service';
import { Skill } from '../../../core/models/Project';

@Component({
  selector: 'app-skills-manage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skills-manage.component.html',
  styleUrl: './skills-manage.component.css',
})
export class SkillsManageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminSkillService = inject(AdminSkillService);

  skills = signal<Skill[]>([]);
  editingId = signal<number | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['langage', Validators.required],
    level: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adminSkillService.getAll().subscribe({ next: (res) => this.skills.set(res.data) });
  }

  edit(skill: Skill): void {
    this.editingId.set(skill.id);
    this.form.setValue({ name: skill.name, category: skill.category, level: skill.level });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset({ name: '', category: 'langage', level: 3 });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const id = this.editingId();

    const request = id
      ? this.adminSkillService.update(id, value)
      : this.adminSkillService.create(value);

    request.subscribe({
      next: () => {
        this.cancelEdit();
        this.load();
      },
    });
  }

  remove(skill: Skill): void {
    if (!confirm(`Supprimer "${skill.name}" ?`)) return;
    this.adminSkillService.delete(skill.id).subscribe({ next: () => this.load() });
  }
}