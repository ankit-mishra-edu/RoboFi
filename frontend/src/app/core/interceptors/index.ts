import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CsrfInterceptor } from './csrf.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { ProxyInterceptor } from './proxy.interceptor';
import { ServerErrorInterceptor } from './server-error.interceptor';

export const httpInterceptorProviders = [
  addInterceptor(ProxyInterceptor),
  addInterceptor(CsrfInterceptor),
  addInterceptor(JwtInterceptor),
  addInterceptor(ServerErrorInterceptor),
];

function addInterceptor<T>(interceptor: T) {
  return { provide: HTTP_INTERCEPTORS, useClass: interceptor, multi: true };
}
