import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.contactService.send(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.successMessage.set(res.message);
        this.form.reset();
        this.isSubmitting.set(false);
      },
      error: () => {
        this.errorMessage.set("Une erreur est survenue. Réessaie dans quelques instants.");
        this.isSubmitting.set(false);
      },
    });
  }
}