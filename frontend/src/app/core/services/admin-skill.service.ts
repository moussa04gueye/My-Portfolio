import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Skill } from '../models/Project';

export interface SkillPayload {
  name: string;
  category: string;
  icon?: string;
  level: number;
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class AdminSkillService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin/skills`;

  getAll(): Observable<{ data: Skill[] }> {
    return this.http.get<{ data: Skill[] }>(this.baseUrl);
  }

  create(payload: SkillPayload): Observable<{ data: Skill }> {
    return this.http.post<{ data: Skill }>(this.baseUrl, payload);
  }

  update(id: number, payload: Partial<SkillPayload>): Observable<{ data: Skill }> {
    return this.http.put<{ data: Skill }>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}