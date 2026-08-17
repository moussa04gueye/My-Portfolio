import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Education } from '../models/Experience';

export interface EducationPayload {
  school: string;
  degree: string;
  field?: string;
  start_date: string;
  end_date?: string | null;
  description?: string;
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class AdminEducationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin/education`;

  getAll(): Observable<{ data: Education[] }> {
    return this.http.get<{ data: Education[] }>(this.baseUrl);
  }

  create(payload: EducationPayload): Observable<{ data: Education }> {
    return this.http.post<{ data: Education }>(this.baseUrl, payload);
  }

  update(id: number, payload: Partial<EducationPayload>): Observable<{ data: Education }> {
    return this.http.put<{ data: Education }>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}