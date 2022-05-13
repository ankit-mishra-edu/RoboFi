import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentRouteService {
  constructor(private _router: Router) {}

  // Data storage for URl of current route
  private _currentRouteURL$: Observable<string> = this._router.events.pipe(
    filter((event: Event) => event instanceof NavigationEnd),
    map((event: Event) => (<NavigationEnd>event).url),
  );

  get currentRouteURL$(): Observable<string> {
    return this._currentRouteURL$;
  }
}
