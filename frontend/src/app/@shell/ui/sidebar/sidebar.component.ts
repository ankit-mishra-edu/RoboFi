import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { TechnologyService } from '@core/services/route';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideBarComponent implements OnInit {
  configPath = ROUTER_UTILS.config;
  isLoggedIn$!: Observable<boolean>;
  isSidebarOpen = false;
  technologies!: {
    Python: string;
    Java: string;
    'Dot NET': string;
  };

  technologyPath$!: Observable<any>;

  constructor(
    private _technologyService: TechnologyService,
    private _authService: AuthService,
  ) {}

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
}
