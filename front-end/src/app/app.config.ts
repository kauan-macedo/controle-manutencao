import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    //IMPORTANTE! CONFIGURANDO O CLIENTE HTTP PARA USAR A API FETCH AO INVÉS DE XMLHTTPREQUEST
    provideHttpClient(
      withFetch(),
    ),
  ]
};
