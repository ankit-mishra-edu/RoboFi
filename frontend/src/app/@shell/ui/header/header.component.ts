import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { UserService } from '@app/pages/user/services/user.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  path = ROUTER_UTILS.config;
  media_url = environment.MEDIA_BASE_URL;

  isLoggedIn$!: Observable<boolean>;
  userProfile$!: Observable<IProfile>;

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
    this.userProfile$ = this._authService.loggedInUser$.pipe(
      filter((loggedInUser: IUser) => loggedInUser.id !== undefined),
      switchMap((loggedInUser: IUser) =>
        this._userService.profileById$(loggedInUser.id),
      ),
    );
  }
}
