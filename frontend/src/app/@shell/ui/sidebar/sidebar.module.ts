import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/components/shared.module';
import { SideBarComponent } from './sidebar.component';

@NgModule({
  declarations: [SideBarComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [SideBarComponent],
})
export class SidebarModule {}
