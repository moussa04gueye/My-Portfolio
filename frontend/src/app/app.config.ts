import { provideZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { credentialsInterceptor } from './core/interceptors/Credentials';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([credentialsInterceptor])),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
};