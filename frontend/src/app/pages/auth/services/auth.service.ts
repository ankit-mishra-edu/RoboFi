import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { ENDPOINT_UTILS } from '@core/utils/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.auth.root}/`;

  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  constructor(private _http: HttpClient) {}

  GetCSRFToken(cookieKey: string): string {
    const cookies = document.cookie.split(';');
    for (const index in cookies) {
      const cookie = cookies[index];
      if (cookie.includes(cookieKey)) {
        return cookie.split('=')[1];
      }
    }
    return '';
  }

  signIn(signInData: IUser): Observable<IToken> {
    return this._http
      .post<IToken>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signIn}/`,
        signInData,
      )
      .pipe(
        tap((token: IToken) => {
          setItem(StorageItem.Auth, token.key);
          this.isLoggedIn$.next(true);
        }),
        share(),
      );
  }

  signUp(userData: IUser): Observable<IToken> {
    return this._http
      .post<IToken>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signUp}/`,
        userData,
      )
      .pipe(share());
  }

  signOut(): Observable<boolean> {
    return this._http
      .post<boolean>(
        this.AUTH_URL + `${ENDPOINT_UTILS.config.auth.signOut}/`,
        '',
      )
      .pipe(
        tap(() => {
          removeItem(StorageItem.Auth);
          this.isLoggedIn$.next(false);
        }),
        share(),
      );
  }

  // Subject for All Users
  private _allUsersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<
    IUser[]
  >([]);
  private _allUsers$: Observable<IUser[]> = <Observable<IUser[]>>(
    this._allUsersSubject$
      .asObservable()
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
        ),
      )
  );

  get allUsers$(): Observable<IUser[]> {
    return this._allUsers$;
  }
  set allUsers(value: IUser[]) {
    this._allUsersSubject$.next(value);
  }
}
