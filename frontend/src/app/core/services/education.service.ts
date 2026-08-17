import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Education } from '../models/Experience';

@Injectable({ providedIn: 'root' })
export class EducationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/education`;

  getAll(): Observable<{ data: Education[] }> {
    return this.http.get<{ data: Education[] }>(this.baseUrl);
  }
}