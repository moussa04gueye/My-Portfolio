import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Attache le header Authorization: Bearer <token> sur les requêtes vers
 * l'API quand un token admin est présent (auth Sanctum par token, adaptée
 * au déploiement multi-domaines : Angular et Laravel sur des hébergeurs
 * séparés n'ont pas de domaine commun pour partager un cookie de session).
 */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};