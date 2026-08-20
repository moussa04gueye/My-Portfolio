import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.getToken()) {
    router.navigate(['/admin/login']);
    return false;
  }

  // Vérifie que le token est toujours valide côté serveur.
  return auth.me().pipe(
    map(() => true),
    catchError(() => {
      auth.clearSession();
      router.navigate(['/admin/login']);
      return of(false);
    })
  );
};
