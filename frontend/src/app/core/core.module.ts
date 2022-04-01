import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './interceptors';
import { BytesModule } from './pipes/bytes/bytes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, BytesModule],
  providers: [httpInterceptorProviders],
  exports: [BytesModule],
})
export class CoreModule {}
