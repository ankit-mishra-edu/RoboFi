import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthNavbarModule } from '@app/pages/auth/components/auth-navbar/auth-navbar.module';
import { SettingsNavbarModule } from '@app/pages/settings/components/settings-navbar/settings-navbar.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, SettingsNavbarModule, AuthNavbarModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
