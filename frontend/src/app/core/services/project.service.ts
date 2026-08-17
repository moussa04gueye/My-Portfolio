import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project } from '../models/Project';

interface ApiCollection<T> {
  data: T[];
}
interface ApiItem<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/projects`;

  getAll(featured = false): Observable<ApiCollection<Project>> {
    let params = new HttpParams();
    if (featured) {
      params = params.set('featured', 'true');
    }
    return this.http.get<ApiCollection<Project>>(this.baseUrl, { params });
  }

  getBySlug(slug: string): Observable<ApiItem<Project>> {
    return this.http.get<ApiItem<Project>>(`${this.baseUrl}/${slug}`);
  }
}