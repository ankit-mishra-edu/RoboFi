import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpLoaderStore } from '@components/http-loader/http-loader.store';
import { environment } from '@environments/environment';
import { finalize, Observable, tap } from 'rxjs';
import { ENDPOINT_UTILS } from '../utils/endpoints.utils';

@Injectable()
export class ProxyInterceptor implements HttpInterceptor {
  constructor(private _httpLoaderStore: HttpLoaderStore) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(`/${ENDPOINT_UTILS.config.base.home}`)) {
      if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
        this._httpLoaderStore.waitingForResponse = true;
      }
      request = request.clone({
        url: `${environment.API_BASE_URL}/${request.url.replace(
          `/${ENDPOINT_UTILS.config.base.home}/`,
          '',
        )}`,
      });
    }

    return next
      .handle(request)
      .pipe(finalize(() => (this._httpLoaderStore.waitingForResponse = false)));
  }
}
