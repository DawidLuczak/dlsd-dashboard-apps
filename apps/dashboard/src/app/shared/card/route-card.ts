import { Route } from '@angular/router';

export interface RouteCard extends Route {
  path: string;
  description: string;
}
