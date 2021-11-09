import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        alert(error.error.detail || error.statusText || 'Server Error');

        if ([401, 403].includes(error.status)) {
          this._authService.cleanUpUserDataOnSignOut();
          return throwError(error);
        } else if (error.status === 500) {
          console.error(error);
          return throwError(error);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
