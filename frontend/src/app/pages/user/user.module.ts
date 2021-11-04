import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/components/shared.module';
import { OverviewPage } from './pages/overview/overview.page';
import { ViewProfilePage } from './pages/view-profile/view-profile.page';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ViewProfilePage, OverviewPage],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
