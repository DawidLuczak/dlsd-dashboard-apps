import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dlsd-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
