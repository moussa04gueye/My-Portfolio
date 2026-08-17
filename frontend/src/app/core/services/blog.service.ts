import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BlogPost } from '../models/Blog-post';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/blog`;

  getAll(): Observable<{ data: BlogPost[] }> {
    // Try API first, fallback to local assets folder if API unavailable
    return this.http.get<{ data: BlogPost[] }>(this.baseUrl).pipe(
      catchError(() => this.http.get<{ data: BlogPost[] }>('/assets/blog/posts.json'))
    );
  }

  getBySlug(slug: string): Observable<{ data: BlogPost }> {
    // Try API first, fallback to reading local markdown + metadata
    return this.http.get<{ data: BlogPost }>(`${this.baseUrl}/${slug}`).pipe(
      catchError(() =>
        // find post metadata in local posts.json then fetch markdown
        this.http.get<{ data: BlogPost[] }>('/assets/blog/posts.json').pipe(
          switchMap((res) => {
            const post = res.data.find((p) => p.slug === slug);
            if (!post) throw new Error('not found');
            // fetch markdown content
            return this.http.get(`/assets/blog/${slug}.md`, { responseType: 'text' }).pipe(
              map((md) => ({ data: { ...post, content: md } as BlogPost }))
            );
          })
        )
      )
    );
  }
}