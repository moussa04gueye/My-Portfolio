import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project } from '../models/Project';

export interface ProjectPayload {
  title: string;
  summary: string;
  description: string;
  stack?: string[];
  repo_url?: string;
  demo_url?: string;
  cover_image?: File | null;
  is_featured: boolean;
  order?: number;
  status: 'draft' | 'published';
  skill_ids?: number[];
}

function toFormData(payload: ProjectPayload, method?: 'PUT'): FormData {
  const fd = new FormData();
  fd.append('title', payload.title);
  fd.append('summary', payload.summary);
  fd.append('description', payload.description);
  fd.append('is_featured', payload.is_featured ? '1' : '0');
  fd.append('status', payload.status);
  if (payload.order !== undefined) fd.append('order', String(payload.order));
  if (payload.repo_url) fd.append('repo_url', payload.repo_url);
  if (payload.demo_url) fd.append('demo_url', payload.demo_url);
  if (payload.cover_image) fd.append('cover_image', payload.cover_image);
  (payload.stack ?? []).forEach((s, i) => fd.append(`stack[${i}]`, s));
  (payload.skill_ids ?? []).forEach((id, i) => fd.append(`skill_ids[${i}]`, String(id)));
  if (method) fd.append('_method', method); // Laravel : spoof PUT pour un envoi multipart
  return fd;
}

@Injectable({ providedIn: 'root' })
export class AdminProjectService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin/projects`;

  getAll(): Observable<{ data: Project[] }> {
    return this.http.get<{ data: Project[] }>(this.baseUrl);
  }

  getOne(id: number): Observable<{ data: Project }> {
    return this.http.get<{ data: Project }>(`${this.baseUrl}/${id}`);
  }

  create(payload: ProjectPayload): Observable<{ data: Project }> {
    return this.http.post<{ data: Project }>(this.baseUrl, toFormData(payload));
  }

  update(id: number, payload: ProjectPayload): Observable<{ data: Project }> {
    // POST + _method=PUT : nécessaire pour envoyer un fichier avec Laravel
    return this.http.post<{ data: Project }>(`${this.baseUrl}/${id}`, toFormData(payload, 'PUT'));
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  uploadImages(projectId: number, files: File[]): Observable<{ data: unknown[] }> {
    const fd = new FormData();
    files.forEach((f) => fd.append('images[]', f));
    return this.http.post<{ data: unknown[] }>(`${this.baseUrl}/${projectId}/images`, fd);
  }

  deleteImage(imageId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/admin/project-images/${imageId}`);
  }
}