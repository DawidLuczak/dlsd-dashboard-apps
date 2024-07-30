import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouteCard } from './route-card';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public card = input.required<RouteCard>();
}
