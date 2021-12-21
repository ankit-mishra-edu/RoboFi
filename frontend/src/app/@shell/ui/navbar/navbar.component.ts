import { Component, OnInit } from '@angular/core';
import { RouteService } from '@app/@core/services/route';
import { SearchBoxService } from '@app/@core/services/search-box/search-box.service';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  configPath = ROUTER_UTILS.config;
  currentRouteURL$!: Observable<string>;

  constructor(
    private _routeService: RouteService,
    private _authService: AuthService,
    private _searchBoxService: SearchBoxService,
  ) {}

  ngOnInit(): void {
    this.currentRouteURL$ = this._routeService.currentRouteURL$;
  }

  routeIsHomeURL(currentRouteURL: string): boolean {
    if (
      currentRouteURL.startsWith(`/${this.configPath.base.home}`) &&
      currentRouteURL.endsWith(`/${this.configPath.base.home}`)
    ) {
      this._searchBoxService.placeholder = 'Home';
      return true;
    }
    return false;
  }

  routeIsSettingsURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes(`/${this.configPath.settings.root}`)) {
      this._searchBoxService.placeholder = 'Settings';
      return true;
    }
    return false;
  }

  routeIsAutomationURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes(`/${this.configPath.automation.root}`)) {
      this._searchBoxService.placeholder = 'Automation';
      return true;
    }
    return false;
  }

  routeIsTriggerURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/trigger')) {
      // this._navbarService.placeholder = 'Trigger';
      return true;
    }
    return false;
  }

  routeIsServerURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/server')) {
      // this._navbarService.placeholder = 'Server';
      return true;
    }
    return false;
  }

  routeIsHealthURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/health')) {
      // this._navbarService.placeholder = 'Health';
      return true;
    }
    return false;
  }

  routeIsAuthURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith(`/${this.configPath.auth.root}`)) {
      return true;
    }
    return false;
  }

  routeIsUserURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes(`/${this.configPath.user.root}`)) {
      this._searchBoxService.placeholder = 'Users';
      return true;
    }
    return false;
  }
}
