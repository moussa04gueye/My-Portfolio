import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminBlogService } from '../../../../core/services/admin-blog.service';
import { Tag } from '../../../../core/models/Blog-post';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css',
})
export class BlogFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminBlogService = inject(AdminBlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  postId = signal<number | null>(null);
  isEditMode = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  allTags = signal<Tag[]>([]);
  coverPreview = signal<string | null>(null);
  newTagName = signal('');
  selectedFile: File | null = null;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    excerpt: ['', [Validators.required, Validators.maxLength(500)]],
    content: ['', [Validators.required]],
    status: ['draft' as 'draft' | 'published', [Validators.required]],
    tag_ids: this.fb.nonNullable.control<number[]>([]),
  });

  ngOnInit(): void {
    this.loadTags();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.postId.set(id);
      this.isEditMode.set(true);

      this.adminBlogService.getOne(id).subscribe({
        next: (res) => {
          const p = res.data;
          this.form.patchValue({
            title: p.title,
            excerpt: p.excerpt,
            content: p.content ?? '',
            status: p.status,
            tag_ids: p.tags.map((t: Tag) => t.id),
          });
          if (p.cover_image) this.coverPreview.set(p.cover_image);
        },
      });
    }
  }

  loadTags(): void {
    this.adminBlogService.getTags().subscribe({ next: (res) => this.allTags.set(res.data) });
  }

  addTag(): void {
    const name = this.newTagName().trim();
    if (!name) return;
    this.adminBlogService.createTag(name).subscribe({
      next: (res) => {
        this.allTags.update((tags) => [...tags, res.data]);
        this.toggleTag(res.data.id, true);
        this.newTagName.set('');
      },
    });
  }

  toggleTag(tagId: number, checked: boolean): void {
    const current = this.form.controls.tag_ids.value;
    if (checked) {
      this.form.controls.tag_ids.setValue([...current, tagId]);
    } else {
      this.form.controls.tag_ids.setValue(current.filter((id) => id !== tagId));
    }
  }

  isTagChecked(tagId: number): boolean {
    return this.form.controls.tag_ids.value.includes(tagId);
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
    const payload = {
      title: raw.title,
      excerpt: raw.excerpt,
      content: raw.content,
      status: raw.status,
      cover_image: this.selectedFile,
      tag_ids: raw.tag_ids,
    };

    const id = this.postId();
    const request = this.isEditMode() && id
      ? this.adminBlogService.update(id, payload)
      : this.adminBlogService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/admin/blog']),
      error: () => {
        this.errorMessage.set("Une erreur est survenue lors de l'enregistrement.");
        this.isSubmitting.set(false);
      },
    });
  }
}