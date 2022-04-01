import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthNavbarModule } from '@modules/auth/components/auth-navbar/auth-navbar.module';
import { AutomationNavbarModule } from '@modules/automation/components/automation-navbar/automation-navbar.module';
import { SettingsNavbarModule } from '@modules/settings/components/settings-navbar/settings-navbar.module';
import { UserNavbarModule } from '@modules/user/components/user-navbar/user-navbar.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SettingsNavbarModule,
    AuthNavbarModule,
    UserNavbarModule,
    AutomationNavbarModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
