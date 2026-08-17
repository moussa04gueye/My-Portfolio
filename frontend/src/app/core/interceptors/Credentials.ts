
import { HttpInterceptorFn } from '@angular/common/http';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  let cloned = req.clone({ withCredentials: true });

  if (!SAFE_METHODS.includes(req.method)) {
    const token = getCookie('XSRF-TOKEN');
    if (token) {
      cloned = cloned.clone({
        setHeaders: { 'X-XSRF-TOKEN': token },
      });
    }
  }

  return next(cloned);
};