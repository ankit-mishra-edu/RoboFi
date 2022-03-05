import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { UserService } from '@app/pages/user/services/user.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';

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
  isNavbarOpen: boolean = false;

  isLoggedIn$!: Observable<boolean>;
  loggedInUser$!: Observable<IUser>;
  userProfile$!: Observable<IProfile>;

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
    this.loggedInUser$ = this._authService.loggedInUser$;
    this.userProfile$ = this.loggedInUser$.pipe(
      filter((loggedInUser: IUser) => loggedInUser.id !== undefined),
      switchMap((loggedInUser: IUser) =>
        this._userService.profileById$(loggedInUser.id).pipe(
          map((userProfile: IProfile) => {
            userProfile.image =
              userProfile.image?.split('/')?.slice(0, 2)?.join('/') +
              '/w_48,h_48,c_scale/' +
              userProfile.image
                ?.split('/')
                ?.slice(2, userProfile.image?.split('/')?.length)
                ?.join('/');
            return userProfile;
          }),
        ),
      ),
      share(),
    );
  }

  ToggleNavbar() {
    document.querySelector('app-navbar')?.classList?.add('collapse');
    document
      .querySelector('app-navbar')
      ?.classList?.toggle('show', this.isNavbarOpen);
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
