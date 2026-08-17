import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BlogPost, Tag } from '../models/Blog-post';

export interface BlogPostPayload {
  title: string;
  excerpt: string;
  content: string;
  cover_image?: File | null;
  status: 'draft' | 'published';
  published_at?: string;
  tag_ids?: number[];
}

function toFormData(payload: BlogPostPayload, method?: 'PUT'): FormData {
  const fd = new FormData();
  fd.append('title', payload.title);
  fd.append('excerpt', payload.excerpt);
  fd.append('content', payload.content);
  fd.append('status', payload.status);
  if (payload.published_at) fd.append('published_at', payload.published_at);
  if (payload.cover_image) fd.append('cover_image', payload.cover_image);
  (payload.tag_ids ?? []).forEach((id, i) => fd.append(`tag_ids[${i}]`, String(id)));
  if (method) fd.append('_method', method);
  return fd;
}

@Injectable({ providedIn: 'root' })
export class AdminBlogService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin/blog`;
  private tagsUrl = `${environment.apiUrl}/admin/tags`;

  getAll(): Observable<{ data: BlogPost[] }> {
    return this.http.get<{ data: BlogPost[] }>(this.baseUrl);
  }

  getOne(id: number): Observable<{ data: BlogPost }> {
    return this.http.get<{ data: BlogPost }>(`${this.baseUrl}/${id}`);
  }

  create(payload: BlogPostPayload): Observable<{ data: BlogPost }> {
    return this.http.post<{ data: BlogPost }>(this.baseUrl, toFormData(payload));
  }

  update(id: number, payload: BlogPostPayload): Observable<{ data: BlogPost }> {
    return this.http.post<{ data: BlogPost }>(`${this.baseUrl}/${id}`, toFormData(payload, 'PUT'));
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  getTags(): Observable<{ data: Tag[] }> {
    return this.http.get<{ data: Tag[] }>(this.tagsUrl);
  }

  createTag(name: string): Observable<{ data: Tag }> {
    return this.http.post<{ data: Tag }>(this.tagsUrl, { name });
  }
}