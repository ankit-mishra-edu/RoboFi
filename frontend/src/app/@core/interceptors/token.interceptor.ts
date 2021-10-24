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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const isLoggedIn = true;
    const token = getItem(StorageItem.Auth);
    const csrfToken = this._authService.GetCSRFToken('csrftoken');
    const isApiUrl = request.url.startsWith(environment.API_BASE_URL);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });
    }

    return next.handle(request);
  }
}
