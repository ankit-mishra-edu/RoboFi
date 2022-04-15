import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '@modules/auth/services/auth.service';
import { TechnologyService } from '@core/services/route';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(
    private _technologyService: TechnologyService,
    private _authService: AuthService,
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
}
