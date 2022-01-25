import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/components/shared.module';
import { HeaderComponent } from './header.component';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, NavbarModule, SharedModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
