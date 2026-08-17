import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AdminSettingsService } from '../../../core/services/admin-settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private settingsService = inject(AdminSettingsService);

  isSaved = signal(false);

  form = this.fb.nonNullable.group({
    site_title: [''],
    contact_email: [''],
    linkedin_url: [''],
    github_url: [''],
  });

  ngOnInit(): void {
    this.settingsService.getAll().subscribe({
      next: (res) => {
        this.form.patchValue({
          site_title: res['site_title'] ?? '',
          contact_email: res['contact_email'] ?? '',
          linkedin_url: res['linkedin_url'] ?? '',
          github_url: res['github_url'] ?? '',
        });
      },
    });
  }

  onSubmit(): void {
    this.settingsService.update(this.form.getRawValue()).subscribe({
      next: () => {
        this.isSaved.set(true);
        setTimeout(() => this.isSaved.set(false), 2500);
      },
    });
  }
}