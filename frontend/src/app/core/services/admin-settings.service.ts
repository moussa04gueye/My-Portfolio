import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminSettingsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin/settings`;

  getAll(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(this.baseUrl);
  }

  update(settings: Record<string, string>): Observable<Record<string, string>> {
    return this.http.put<Record<string, string>>(this.baseUrl, { settings });
  }
}