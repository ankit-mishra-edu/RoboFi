import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  ProxyInterceptor,
  ServerErrorInterceptor,
  TokenInterceptor,
} from './interceptors';
import { BytesModule } from './pipes/bytes/bytes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, BytesModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ProxyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  exports: [BytesModule],
})
export class CoreModule {}
