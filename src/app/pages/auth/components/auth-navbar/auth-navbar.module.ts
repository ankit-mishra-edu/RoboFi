import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthNavbarComponent } from './auth-navbar.component';

@NgModule({
  declarations: [AuthNavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthNavbarComponent],
})
export class AuthNavbarModule {}
