import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AUTHENTICATION_SERVICE_API_URL,
  environment,
} from '@dlsd/data-access-user';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: AUTHENTICATION_SERVICE_API_URL,
      useValue:
        environment.gatewayServiceUrl +
        environment.authenticationServiceEndpoint,
    },
  ],
};
