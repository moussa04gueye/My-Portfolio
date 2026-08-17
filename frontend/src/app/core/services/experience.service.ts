import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Experience } from '../models/Experience';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/experiences`;

  getAll(): Observable<{ data: Experience[] }> {
    return this.http.get<{ data: Experience[] }>(this.baseUrl);
  }
}