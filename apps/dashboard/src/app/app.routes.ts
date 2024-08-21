import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { RouteCard } from './shared/card/route-card';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

export const remoteRoutes: RouteCard[] = [
  {
    title: 'Design System',
    path: 'design-system',
    description: 'Design system preview',
    loadChildren: () =>
      loadRemoteModule('design-system', './Routes').then((m) => m.remoteRoutes),
  },
];

export const loginRoute: Route = {
  title: 'Login',
  path: 'login',
  loadChildren: () =>
    loadRemoteModule('login', './Routes').then((m) => m.remoteRoutes),
};

export const appRoutes: Route[] = [
  {
    title: 'Dashboard',
    path: '',
    component: DashboardComponent,
    data: {
      cards: remoteRoutes,
    },
  },
  loginRoute,
  ...remoteRoutes,
];
