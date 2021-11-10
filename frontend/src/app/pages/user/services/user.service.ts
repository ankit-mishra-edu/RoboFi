import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENDPOINT_UTILS } from '@app/@core/utils/endpoints';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _authService: AuthService,
  ) {}

  private _USER_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.user.root}`;

  userById$ = (id: number): Observable<IUser> => {
    return this._http
      .get<IUser>(
        `${this._USER_URL}/${ENDPOINT_UTILS.config.user.detail}/${id}`,
      )
      .pipe(share());
  };

  allUsers$: Observable<IUser[]> = this._http
    .get<IUser[]>(`${this._USER_URL}/${ENDPOINT_UTILS.config.user.detail}`)
    .pipe(share());

  profileById$ = (id: number): Observable<IProfile> => {
    return this._http
      .get<IProfile>(
        `${this._USER_URL}/${id}/${ENDPOINT_UTILS.config.user.profile}`,
      )
      .pipe(share());
  };

  allProfiles$: Observable<IProfile[]> = this._http
    .get<IProfile[]>(`${this._USER_URL}/${ENDPOINT_UTILS.config.user.profile}`)
    .pipe(share());

  editProfile$ = (profileData: IProfile): Observable<IProfile> => {
    return this._http
      .patch<IProfile>(
        `${this._USER_URL}/${this._authService.loggedInUser.id}/${ENDPOINT_UTILS.config.user.profile}`,
        profileData,
      )
      .pipe(
        tap(() => this._router.navigate([`${ROUTER_UTILS.config.base.home}`])),
        share(),
      );
  };

  editUserDetails(userData: IUser): Observable<IUser> {
    return this._http
      .patch<IUser>(
        `${this._USER_URL}/${this._authService.loggedInUser.id}/${ENDPOINT_UTILS.config.user.detail}`,
        userData,
      )
      .pipe(
        tap(() => this._router.navigate([`${ROUTER_UTILS.config.base.home}`])),
        share(),
      );
  }

  changePassword(userData: IUser): Observable<IUser> {
    return this._http
      .patch<IUser>(
        `${this._USER_URL}/${this._authService.loggedInUser.id}/${ENDPOINT_UTILS.config.user.changePassword}`,
        userData,
      )
      .pipe(
        tap(() => this._router.navigate([`${ROUTER_UTILS.config.base.home}`])),
        share(),
      );
  }
}
