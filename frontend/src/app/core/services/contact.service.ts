import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactPayload } from '../models/Contact-message';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/contact`;

  send(payload: ContactPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.baseUrl, payload);
  }
}