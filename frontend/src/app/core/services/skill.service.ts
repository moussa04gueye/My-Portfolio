import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Skill } from '../models/Project';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/skills`;

  getAll(): Observable<{ data: Skill[] }> {
    return this.http.get<{ data: Skill[] }>(this.baseUrl);
  }
}