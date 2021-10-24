import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private _router: Router) {}
  // Data storage for which navigation bar to show
  private _currentRouteURL$: Observable<NavigationEnd> =
    this._router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      map((event: Event) => <NavigationEnd>event),
    );

  get currentRouteURL$(): Observable<NavigationEnd> {
    return this._currentRouteURL$;
  }
}
