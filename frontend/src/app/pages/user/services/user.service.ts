import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@app/@core/utils/endpoints';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  private _USER_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.user.root}`;

  userById$ = (id: number): Observable<IUser> => {
    return this._http
      .get<IUser>(
        `${this._USER_URL}/${ENDPOINT_UTILS.config.user.detail}/${id}/`,
      )
      .pipe(share());
  };

  allUsers$: Observable<IUser[]> = this._http
    .get<IUser[]>(`${this._USER_URL}/${ENDPOINT_UTILS.config.user.detail}/`)
    .pipe(share());

  profileById$ = (id: number): Observable<IProfile> => {
    return this._http
      .get<IProfile>(
        `${this._USER_URL}/${ENDPOINT_UTILS.config.user.profile}/${id}/`,
      )
      .pipe(share());
  };

  allProfiles$: Observable<IProfile[]> = this._http
    .get<IProfile[]>(`${this._USER_URL}/${ENDPOINT_UTILS.config.user.profile}/`)
    .pipe(share());

  editProfile$ = (profileData: IProfile): Observable<IProfile> => {
    return this._http
      .patch<IProfile>(
        `${this._USER_URL}/${ENDPOINT_UTILS.config.user.profile}/${profileData.user}/`,
        profileData,
      )
      .pipe(share());
  };
}
