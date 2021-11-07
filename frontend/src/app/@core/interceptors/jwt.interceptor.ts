import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, StorageItem } from '@app/@core/utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ENDPOINT_UTILS } from '../utils/endpoints';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = getItem(StorageItem.AccessToken);
    const isLoggedIn = this._authService.isLoggedIn;
    const isApiUrl = request.url.startsWith(environment.API_BASE_URL);

    if (
      request.url.indexOf(
        `${ENDPOINT_UTILS.config.auth.signIn}/${ENDPOINT_UTILS.config.auth.refreshToken}`,
      ) > -1
    ) {
      return next.handle(request);
    } else if (!(isLoggedIn && isApiUrl)) {
      return next.handle(request);
    } else if (
      Date.now() <
      Number(
        this._authService.decodeJWT(<string>getItem(StorageItem.AccessToken))
          .exp,
      ) *
        1000
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(request);
    }

    return this._authService.refreshToken().pipe(
      switchMap((token: IToken) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        return next.handle(request);
      }),
    );
  }
}
