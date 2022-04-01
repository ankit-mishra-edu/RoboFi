import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutomationNavbarComponent } from './automation-navbar.component';

@NgModule({
  declarations: [AutomationNavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [AutomationNavbarComponent],
})
export class AutomationNavbarModule {}
