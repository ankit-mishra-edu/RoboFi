import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ENDPOINT_UTILS } from '../utils/endpoints';

@Injectable()
export class ProxyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    // request = request.clone({
    //   url: request.url.startsWith(`/${ENDPOINT_UTILS.config.base.home}`)
    //     ? `${window.location.origin}/v1/${request.url.replace(
    //         `/${ENDPOINT_UTILS.config.base.home}/`,
    //         '',
    //       )}`
    //     : 'https://pibeedjango.herokuapp.com/api/login/',
    // });

    request = request.clone({
      url: request.url.startsWith(`/${ENDPOINT_UTILS.config.base.home}`)
        ? `${environment.apiUrl}${request.url.replace(
            `/${ENDPOINT_UTILS.config.base.home}/`,
            '',
          )}`
        : 'https://pibeedjango.herokuapp.com/api/login/',
    });
    return next.handle(request);
  }
}
