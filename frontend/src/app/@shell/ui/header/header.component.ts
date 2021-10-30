import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { UserService } from '@app/pages/user/services/user.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  path = ROUTER_UTILS.config;
  media_url = environment.MEDIA_BASE_URL;
  isLoggedIn$!: Observable<boolean>;

  userProfile$ = this._authService.loggedInUser$.pipe(
    switchMap((loggedInUser: IUser) =>
      this._userService.profileById$(loggedInUser.id),
    ),
    share(),
  );

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
  }

  onClickSignOut(): void {
    this._authService.signOut().subscribe(() => {
      const { root, signIn } = ROUTER_UTILS.config.auth;
      this.router.navigate(['/', root, signIn]);
    });
  }
}
