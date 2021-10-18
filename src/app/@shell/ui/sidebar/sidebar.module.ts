import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './sidebar.component';

@NgModule({
  declarations: [SideBarComponent],
  imports: [CommonModule, RouterModule],
  exports: [SideBarComponent],
})
export class SidebarModule {}
