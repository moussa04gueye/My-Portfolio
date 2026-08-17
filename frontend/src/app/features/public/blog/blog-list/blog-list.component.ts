import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { BlogPost } from '../../../../core/models/Blog-post';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionTitleComponent, LoaderComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);

  posts = signal<BlogPost[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.blogService.getAll().subscribe({
      next: (res) => {
        this.posts.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}