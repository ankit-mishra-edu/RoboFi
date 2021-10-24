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
    let formatted_url = request.url;
    if (request.url.startsWith(`/${ENDPOINT_UTILS.config.base.home}`)) {
      formatted_url = `${environment.API_BASE_URL}/${request.url.replace(
        `/${ENDPOINT_UTILS.config.base.home}/`,
        '',
      )}`;
    } else if (
      request.url.startsWith(
        `${environment.API_BASE_URL}/${ENDPOINT_UTILS.config.base.media}`,
      )
    ) {
      formatted_url = `${environment.MEDIA_BASE_URL}/${request.url.replace(
        `/${ENDPOINT_UTILS.config.base.media}/`,
        '',
      )}`;
    }

    request = request.clone({
      url: formatted_url,
    });
    return next.handle(request);
  }
}
