import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Account } from '@dlsd/data-access-user';
import { DLSDCallbackOption, DLSDDropdownDirective } from 'dlsd-angular-ui';

@Component({
  standalone: true,
  selector: 'dlsd-layout-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss'],
  imports: [DLSDDropdownDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountItemComponent {
  public account = input.required<Account>();
  public accountOptions = input.required<DLSDCallbackOption[]>();
}
