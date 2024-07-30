import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { NavComponent } from '@dlsd/shared-layout';
import { DLSDActiveRoutesTree } from 'dlsd-angular-ui';
import { appRoutes } from './app.routes';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardComponent, NavComponent],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected routes = signal<Routes>(appRoutes);
  protected activeRouteTree = signal<DLSDActiveRoutesTree>({
    route: this.routes()[0],
  });

  constructor(private router: Router) {
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
