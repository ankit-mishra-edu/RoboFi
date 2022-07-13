import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getItem, removeItem, setItem, StorageItem } from '@core/utils';
import { ENDPOINT_UTILS } from '@core/utils/endpoints.utils';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {
    window.onbeforeunload = () => {
      setItem(StorageItem.User, this.loggedInUser);
    };
    if (
      this.isLoggedIn &&
      (<IUser>getItem(StorageItem.User))?.username != undefined
    ) {
      this.loggedInUser = <IUser>getItem(StorageItem.User);
    } else {
      this.cleanUpUserDataOnSignOut();
    }
    removeItem(StorageItem.User);
  }

  AUTH_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.auth.root}/`;

  private _isLoggedInSubject$ = new BehaviorSubject<boolean>(
    !!getItem(StorageItem.AccessToken),
  );
  private _isLoggedIn$ = this._isLoggedInSubject$.asObservable();

  get isLoggedIn(): boolean {
    return this._isLoggedInSubject$.getValue();
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedInSubject$.next(value);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$;
  }

  private _loggedInUserSubject$ = new BehaviorSubject<IUser>(<IUser>{});
  private _loggedInUser$ = this._loggedInUserSubject$.asObservable();

  get loggedInUser(): IUser {
    return this._loggedInUserSubject$.getValue();
  }

  set loggedInUser(value: IUser) {
    this._loggedInUserSubject$.next(value);
  }

  get loggedInUser$(): Observable<IUser> {
    return this._loggedInUser$;
  }

  GetCSRFToken = (cookieKey: string): string => {
    const cookies = document.cookie.split(';');
    for (const index in cookies) {
      const cookie = cookies[index];
      if (cookie.includes(cookieKey)) {
        return cookie.split('=')[1];
      }
    }
    return '';
  };

  signIn = (signInData: IUser): Observable<IToken> => {
    return this._http
      .post<IToken>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signIn}`,
        signInData,
      )
      .pipe(
        tap((token: IToken) => {
          this.addTokenToLocalStorage(token.access, token.refresh);
          this._isLoggedInSubject$.next(true);
          this.loggedInUser = <IUser>this.decodeJWT(token.access).user;
        }),
        share(),
      );
  };

  signUp = (userData: IUser): Observable<IToken> => {
    return this._http
      .post<IToken>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signUp}`,
        userData,
      )
      .pipe(share());
  };

  signOut = (): Observable<boolean> => {
    return this._http
      .post<boolean>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signOut}`,
        '',
      )
      .pipe(
        tap(() => {
          this.cleanUpUserDataOnSignOut();
        }),
        share(),
      );
  };

  refreshToken = (): Observable<IToken> => {
    return this._http
      .post<IToken>(
        this.AUTH_URL +
          `${ENDPOINT_UTILS.config.auth.signIn}/${ENDPOINT_UTILS.config.auth.refreshToken}`,
        <IToken>{ refresh: getItem(StorageItem.RefreshToken) },
      )
      .pipe(
        tap((token: IToken) => {
          this.addTokenToLocalStorage(
            token.access,
            <string>getItem(StorageItem.RefreshToken),
          );
        }),
      );
  };

  addTokenToLocalStorage = (access: string, refresh: string): void => {
    setItem(StorageItem.AccessToken, access);
    setItem(StorageItem.RefreshToken, refresh);
  };

  removeTokenFromLocalStorage = (): void => {
    removeItem(StorageItem.AccessToken);
    removeItem(StorageItem.RefreshToken);
  };

  decodeJWT = (accessToken: string): any => {
    return JSON.parse(atob(accessToken.split('.')[1]));
  };

  cleanUpUserDataOnSignOut(): void {
    this.removeTokenFromLocalStorage();
    this._isLoggedInSubject$.next(false);
    this.loggedInUser = <IUser>{};
    const { root, signIn } = ROUTER_UTILS.config.auth;
    this._router.navigate(['/', root, signIn]);
  }
}
