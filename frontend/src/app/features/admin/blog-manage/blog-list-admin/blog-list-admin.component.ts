import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminBlogService } from '../../../../core/services/admin-blog.service';
import { BlogPost } from '../../../../core/models/Blog-post';

@Component({
  selector: 'app-blog-list-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list-admin.component.html',
  styleUrl: './blog-list-admin.component.css',
})
export class BlogListAdminComponent implements OnInit {
  private adminBlogService = inject(AdminBlogService);

  posts = signal<BlogPost[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.adminBlogService.getAll().subscribe({
      next: (res) => {
        this.posts.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  remove(post: BlogPost): void {
    if (!confirm(`Supprimer l'article "${post.title}" ?`)) return;
    this.adminBlogService.delete(post.id).subscribe({ next: () => this.load() });
  }
}