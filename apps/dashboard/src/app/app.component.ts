import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@dlsd/data-access-user';
import { HeaderComponent, NavComponent } from '@dlsd/shared-layout';
import {
  DLSDActiveRoutesTree,
  DLSDButtonComponent,
  DLSDCallbackOption,
} from 'dlsd-angular-ui';
import { loginRoute, remoteRoutes } from './app.routes';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardComponent,
    NavComponent,
    HeaderComponent,
    DLSDButtonComponent,
  ],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly loginRoute = loginRoute;
  protected readonly remoteRoutes = remoteRoutes;
  protected readonly accountOptions: DLSDCallbackOption[] = [
    {
      name: 'Logout',
      value: () => this.authenticationService.logout(),
    },
  ];

  protected activeRouteTree = signal<DLSDActiveRoutesTree>({
    route: { path: '' },
  });

  constructor(
    private router: Router,
    protected authenticationService: AuthenticationService
  ) {
    effect(() => this.navigateTo(this.activeRouteTree()));
  }

  protected navigateTo(activeRoute: DLSDActiveRoutesTree): void {
    const path = this.combineRoutePath(activeRoute);
    this.router.navigate(path);
  }

  private combineRoutePath(activeRoute: DLSDActiveRoutesTree): string[] {
    let routeTree = activeRoute.routesTree;
    const path = [`${routeTree?.route.path ?? activeRoute.route.path}`];

    while (routeTree?.routesTree?.route.path) {
      path.push(routeTree.routesTree.route.path);
      routeTree = routeTree.routesTree;
    }

    return path;
  }
}
