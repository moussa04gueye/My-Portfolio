import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  /** Récupère le cookie CSRF requis par Sanctum avant tout login. */
  private csrfCookie(): Observable<void> {
    return this.http.get<void>(`${environment.sanctumUrl}/sanctum/csrf-cookie`);
  }

  login(email: string, password: string): Observable<{ user: User }> {
    return new Observable((observer) => {
      this.csrfCookie().subscribe({
        next: () => {
          this.http
            .post<{ user: User }>(`${environment.apiUrl}/admin/login`, { email, password })
            .pipe(
              tap((res) => {
                this.currentUser.set(res.user);
                this.isAuthenticated.set(true);
              })
            )
            .subscribe({
              next: (res) => {
                observer.next(res);
                observer.complete();
              },
              error: (err) => observer.error(err),
            });
        },
        error: (err) => observer.error(err),
      });
    });
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/admin/logout`, {}).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
      })
    );
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