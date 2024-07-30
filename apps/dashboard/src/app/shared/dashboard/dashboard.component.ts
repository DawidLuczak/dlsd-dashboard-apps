import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { RouteCard } from '../card/route-card';
import { DashboardData } from './dashboard';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CardComponent, CommonModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  protected cards = signal<RouteCard[]>([]);

  private get cards$(): Observable<RouteCard[]> {
    return (this.activatedRoute.data as Observable<DashboardData>).pipe(
      map((data) => data.cards)
    );
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.cards$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cards) => {
      this.cards.set(cards);
    });
  }

  protected openCard(card: RouteCard): void {
    this.router.navigate([card.path]);
  }
}
