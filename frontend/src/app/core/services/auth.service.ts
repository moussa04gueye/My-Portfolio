import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

const TOKEN_KEY = 'admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  isAuthenticated = signal(this.hasToken());

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    return this.http
      .post<{ user: User; token: string }>(`${environment.apiUrl}/admin/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          this.currentUser.set(res.user);
          this.isAuthenticated.set(true);
        })
      );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/admin/logout`, {}).pipe(
      tap(() => this.clearSession())
    );
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  me(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${environment.apiUrl}/admin/me`).pipe(
      tap((res) => {
        this.currentUser.set(res.user);
        this.isAuthenticated.set(true);
      })
    );
  }
}