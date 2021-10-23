import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsNavbarComponent } from './settings-navbar.component';

@NgModule({
  declarations: [SettingsNavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [SettingsNavbarComponent],
})
export class SettingsNavbarModule {}
