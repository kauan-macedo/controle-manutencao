import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    //IMPORTANTE! CONFIGURANDO O CLIENTE HTTP PARA USAR A API FETCH AO INVÉS DE XMLHTTPREQUEST
    provideHttpClient(
      withFetch(),
    ),
    importProvidersFrom(
      ToastNoAnimationModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
      })
    )
  ]
};
