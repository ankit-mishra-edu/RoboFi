import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserNavbarComponent } from './user-navbar.component';

@NgModule({
  declarations: [UserNavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserNavbarComponent],
})
export class UserNavbarModule {}
