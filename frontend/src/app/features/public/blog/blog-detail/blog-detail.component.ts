import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { BlogPost } from '../../../../core/models/Blog-post';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post = signal<BlogPost | null>(null);
  isLoading = signal(true);
  notFound = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.blogService.getBySlug(slug).subscribe({
      next: (res) => {
        const p = res.data;
        if (p.content && p.content.includes('#')) {
          // basic markdown -> html conversion for static posts
          p.content = this.convertMarkdownToHtml(p.content || '');
        }
        this.post.set(p);
        this.isLoading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.isLoading.set(false);
      },
    });
  }

  private escapeHtml(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private convertMarkdownToHtml(md: string): string {
    // very small converter: code blocks, headings, inline code, paragraphs
    let out = md;
    // code fences
    out = out.replace(/```([\s\S]*?)```/g, (_m, code) => `<pre><code>${this.escapeHtml(code)}</code></pre>`);
    // headings
    out = out.replace(/^######\s*(.*)$/gm, '<h6>$1</h6>');
    out = out.replace(/^#####\s*(.*)$/gm, '<h5>$1</h5>');
    out = out.replace(/^####\s*(.*)$/gm, '<h4>$1</h4>');
    out = out.replace(/^###\s*(.*)$/gm, '<h3>$1</h3>');
    out = out.replace(/^##\s*(.*)$/gm, '<h2>$1</h2>');
    out = out.replace(/^#\s*(.*)$/gm, '<h1>$1</h1>');
    // inline code
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    // paragraphs: split on blank lines
    const parts = out.split(/\n\s*\n/).map((p) => p.trim());
    out = parts
      .map((p) => {
        if (p.startsWith('<h') || p.startsWith('<pre')) return p;
        return `<p>${p}</p>`;
      })
      .join('\n');
    return out;
  }
}