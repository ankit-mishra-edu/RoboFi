import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { ENDPOINT_UTILS } from '@core/utils/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {
    window.onbeforeunload = () => {
      setItem(StorageItem.User, this.loggedInUser);
    };
    if (this.isLoggedIn && getItem(StorageItem.User)) {
      this.loggedInUser = <IUser>getItem(StorageItem.User);
    }
    removeItem(StorageItem.User);

    // this._isLoggedIn$
    //   .pipe(
    //     tap(console.log),
    //     switchMap(() => this.refreshToken(getItem(StorageItem.AccessToken))),
    //   )
    //   .subscribe();
  }

  AUTH_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.auth.root}/`;

  private _isLoggedInSubject$ = new BehaviorSubject<boolean>(
    !!getItem(StorageItem.AccessToken),
  );
  private _isLoggedIn$ = this._isLoggedInSubject$.asObservable();

  get isLoggedIn(): boolean {
    return this._isLoggedInSubject$.getValue();
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
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signIn}/`,
        signInData,
      )
      .pipe(
        tap((token: IToken) => {
          setItem(StorageItem.AccessToken, token.access);
          setItem(StorageItem.RefreshToken, token.refresh);
          this._isLoggedInSubject$.next(true);
          this.loggedInUser = <IUser>(
            JSON.parse(atob(token.access.split('.')[1])).user
          );
        }),
        share(),
      );
  };

  signUp = (userData: IUser): Observable<IToken> => {
    return this._http
      .post<IToken>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signUp}/`,
        userData,
      )
      .pipe(share());
  };

  signOut = (): Observable<boolean> => {
    return this._http
      .post<boolean>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signOut}/`,
        '',
      )
      .pipe(
        tap(() => {
          removeItem(StorageItem.AccessToken);
          removeItem(StorageItem.RefreshToken);
          this._isLoggedInSubject$.next(false);
          this.loggedInUser = <IUser>{};
        }),
        share(),
      );
  };

  refreshToken = (refreshToken: string | unknown): Observable<IToken> => {
    return this._http
      .post<IToken>(
        this.AUTH_URL +
          `${ENDPOINT_UTILS.config.auth.signIn}/${ENDPOINT_UTILS.config.auth.refreshToken}/`,
        refreshToken,
      )
      .pipe(
        tap((token: IToken) => {
          setItem(StorageItem.AccessToken, token.access);
        }),
        share(),
      );
  };
}
