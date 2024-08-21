import { registerLocaleData } from '@angular/common';
import { HttpBackend, provideHttpClient } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AUTHENTICATION_SERVICE_API_URL,
  environment,
} from '@dlsd/data-access-user';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { appRoutes } from './app.routes';

registerLocaleData(localePl);

export const createTranslateLoader = (http: HttpBackend) =>
  new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/' },
    { prefix: './assets/i18n/dlsd-angular-ui/' },
  ]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'pl',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpBackend],
        },
      })
    ),
    {
      provide: AUTHENTICATION_SERVICE_API_URL,
      useValue:
        environment.gatewayServiceUrl +
        environment.authenticationServiceEndpoint,
    },
  ],
};
