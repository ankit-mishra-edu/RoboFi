import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { OverviewPage } from './pages/overview/overview.page';
import { SignOutPage } from './pages/sign-out/sign-out.page';
import { ViewProfilePage } from './pages/view-profile/view-profile.page';

const routes: Routes = [
  {
    path: `${ROUTER_UTILS.config.user.profile}/:id`,
    component: ViewProfilePage,
  },
  {
    path: ROUTER_UTILS.config.user.signOut,
    component: SignOutPage,
  },
  { path: ROUTER_UTILS.config.user.overview, component: OverviewPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
