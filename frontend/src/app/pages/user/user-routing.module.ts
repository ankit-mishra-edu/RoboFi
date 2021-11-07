import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import { EditDetailsPage } from './pages/edit-details/edit-details.page';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';
import { OverviewPage } from './pages/overview/overview.page';
import { SignOutPage } from './pages/sign-out/sign-out.page';
import { UserHomePage } from './pages/user-home/user-home.page';
import { ViewProfilePage } from './pages/view-profile/view-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserHomePage,
  },
  {
    path: ROUTER_UTILS.config.user.editDetails,
    component: EditDetailsPage,
  },
  {
    path: ROUTER_UTILS.config.user.changePassword,
    component: ChangePasswordPage,
  },
  {
    path: `${ROUTER_UTILS.config.user.profile}/:id`,
    component: ViewProfilePage,
  },
  {
    path: `${ROUTER_UTILS.config.user.profile}/:id/${ROUTER_UTILS.config.user.editProfile}`,
    component: EditProfilePage,
  },
  { path: ROUTER_UTILS.config.user.overview, component: OverviewPage },
  {
    path: ROUTER_UTILS.config.user.signOut,
    component: SignOutPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
