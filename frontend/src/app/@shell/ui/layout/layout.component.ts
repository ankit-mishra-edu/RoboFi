import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { RouteService } from '@core/services/route';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  routingIsDelayed!: boolean;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private _routeServices: RouteService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this._router.events.subscribe((routerEvent: Event) =>
      this.checkRouterEvent(routerEvent),
    );
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.routingIsDelayed = true;
    } else if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.routingIsDelayed = false;
    }
  }
}
