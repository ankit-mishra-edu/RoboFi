import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [httpInterceptorProviders],
  exports: [],
})
export class CoreModule {}
