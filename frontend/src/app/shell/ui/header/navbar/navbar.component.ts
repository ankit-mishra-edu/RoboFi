import { Component, OnInit } from '@angular/core';
import { SearchBoxStore } from '@components/search-box/search-box.store';
import { CurrentRouteService } from '@core/services/route';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@modules/auth/services/auth.service';
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
    private _authService: AuthService,
    private _searchBoxStore: SearchBoxStore,
    private _currentRouteService: CurrentRouteService,
  ) {}

  ngOnInit(): void {
    this.currentRouteURL$ = this._currentRouteService.currentRouteURL$;
  }

  routeIsHomeURL(currentRouteURL: string): boolean {
    if (
      currentRouteURL.startsWith(`/${this.configPath.base.home}`) &&
      currentRouteURL.endsWith(`/${this.configPath.base.home}`)
    ) {
      this._searchBoxStore.placeholder = 'Home';
      return true;
    }
    return false;
  }

  routeIsSettingsURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes(`/${this.configPath.settings.root}`)) {
      this._searchBoxStore.placeholder = 'Settings';
      return true;
    }
    return false;
  }

  routeIsAutomationURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes(`/${this.configPath.automation.root}`)) {
      this._searchBoxStore.placeholder = 'Automation';
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
      this._searchBoxStore.placeholder = 'Users';
      return true;
    }
    return false;
  }
}
