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
    let proxy_url = request.url;
    if (request.url.startsWith(`/${ENDPOINT_UTILS.config.base.home}`)) {
      proxy_url = `${environment.API_BASE_URL}/${request.url.replace(
        `/${ENDPOINT_UTILS.config.base.home}/`,
        '',
      )}`;
    }

    request = request.clone({
      url: proxy_url,
    });
    return next.handle(request);
  }
}
