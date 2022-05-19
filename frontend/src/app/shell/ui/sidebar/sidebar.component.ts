import { Component, OnInit } from '@angular/core';
import { TechnologyService } from '@core/services/route';
import { ThemeList, ThemeService } from '@core/services/theme';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { environment } from '@environments/environment';
import { AuthService } from '@modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _themeService: ThemeService,
    private _technologyService: TechnologyService,
  ) {}

  isSidebarOpen = false;
  configPath = ROUTER_UTILS.config;
  ADMIN_URL = environment.ADMIN_URL;
  isLoggedIn$!: Observable<boolean>;
  technologyPath$!: Observable<any>;

  technologies!: {
    Python: string;
    Java: string;
    'Dot NET': string;
  };

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
    this.technologies = this._technologyService.technologies;

    this.technologyPath$ = this._technologyService.selectedTechnology$.pipe(
      map(
        (selectedTechnology) =>
          ROUTER_UTILS.config.technology[selectedTechnology],
      ),
    );
  }

  navigateToAdmin(): void {
    window.open(this.ADMIN_URL);
  }

  get storedThemeIsDark(): boolean {
    return this._themeService.storedTheme === ThemeList.Dark;
  }

  ToggleTheme(): void {
    this._themeService.setTheme(
      this.storedThemeIsDark ? ThemeList.Light : ThemeList.Dark,
    );
  }
}
