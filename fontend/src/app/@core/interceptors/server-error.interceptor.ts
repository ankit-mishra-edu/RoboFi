import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ROUTER_UTILS } from '../utils/router.utils';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        error.error
          ? alert(error.error)
          : error.statusText
          ? alert(error.statusText)
          : 'Server Error';

        if ([401, 403].includes(error.status)) {
          const { root, signIn } = ROUTER_UTILS.config.auth;
          this.router.navigate(['/', root, signIn]);
          // this.router.navigateByUrl(ROUTER_UTILS.config.auth.signIn);
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
