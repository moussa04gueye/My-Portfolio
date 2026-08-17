import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Experience } from '../models/Experience';

export interface ExperiencePayload {
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string | null;
  description?: string;
  type: 'stage' | 'emploi' | 'projet';
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class AdminExperienceService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin/experiences`;

  getAll(): Observable<{ data: Experience[] }> {
    return this.http.get<{ data: Experience[] }>(this.baseUrl);
  }

  create(payload: ExperiencePayload): Observable<{ data: Experience }> {
    return this.http.post<{ data: Experience }>(this.baseUrl, payload);
  }

  update(id: number, payload: Partial<ExperiencePayload>): Observable<{ data: Experience }> {
    return this.http.put<{ data: Experience }>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}