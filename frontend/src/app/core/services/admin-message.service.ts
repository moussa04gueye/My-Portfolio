import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactMessage } from '../models/Contact-message';

@Injectable({ providedIn: 'root' })
export class AdminMessageService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin/contact-messages`;

  getAll(): Observable<{ data: ContactMessage[] }> {
    return this.http.get<{ data: ContactMessage[] }>(this.baseUrl);
  }

  getOne(id: number): Observable<{ data: ContactMessage }> {
    return this.http.get<{ data: ContactMessage }>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}