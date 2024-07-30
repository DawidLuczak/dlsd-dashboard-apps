import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Route } from '@angular/router';
import { DLSDActiveRoutesTree, DLSDNavItemComponent } from 'dlsd-angular-ui';

@Component({
  standalone: true,
  selector: 'dlsd-layout-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [DLSDNavItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public routes = input.required<Route[]>();
  public activeRouteTree = model.required<DLSDActiveRoutesTree>();
}
