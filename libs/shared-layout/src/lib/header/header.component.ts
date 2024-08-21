import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Account } from '@dlsd/data-access-user';
import { DLSDButtonComponent, DLSDCallbackOption } from 'dlsd-angular-ui';
import { AccountItemComponent } from './account-item/account-item.component';

@Component({
  standalone: true,
  selector: 'dlsd-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [DLSDButtonComponent, RouterModule, AccountItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public account = input.required<Account | null>();
  public accountOptions = input.required<DLSDCallbackOption[]>();
  public loginRoute = input.required<Route>();
}
