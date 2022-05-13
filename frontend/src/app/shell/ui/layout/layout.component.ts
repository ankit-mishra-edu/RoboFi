import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { HttpLoaderStore } from '@components/http-loader/http-loader.store';
import { AuthService } from '@modules/auth/services/auth.service';
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
  waitingForResponse$!: Observable<boolean>;

  constructor(
    private _router: Router,
    private authService: AuthService,
    private _httpLoaderStore: HttpLoaderStore,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this._router.events.subscribe((routerEvent: Event) =>
      this.checkRouterEvent(routerEvent),
    );

    this.waitingForResponse$ = this._httpLoaderStore.waitingForResponse$;
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
