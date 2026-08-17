import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/settings`;

  getAll(): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(this.baseUrl);
  }
}