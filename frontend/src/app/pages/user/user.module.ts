import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import { EditDetailsPage } from './pages/edit-details/edit-details.page';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';
import { OverviewPage } from './pages/overview/overview.page';
import { UserHomePage } from './pages/user-home/user-home.page';
import { ViewProfilePage } from './pages/view-profile/view-profile.page';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    ViewProfilePage,
    OverviewPage,
    ChangePasswordPage,
    EditDetailsPage,
    EditProfilePage,
    UserHomePage,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule],
})
export class UserModule {}
