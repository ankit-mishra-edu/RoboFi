import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AccountPage } from './pages/account/account.page';
import { AppearancePage } from './pages/appearance/appearance.page';
import { BillingPage } from './pages/billing/billing.page';
import { BlockedUsersPage } from './pages/blocked-users/blocked-users.page';
import { NotificationsPage } from './pages/notifications/notifications.page';
import { SecurityLogPage } from './pages/security-log/security-log.page';
import { SecurityPage } from './pages/security/security.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.settings.appearance,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.account,
    component: AccountPage,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.appearance,
    component: AppearancePage,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.billing,
    component: BillingPage,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.blockedUsers,
    component: BlockedUsersPage,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.notifications,
    component: NotificationsPage,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.security,
    component: SecurityPage,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.securityLog,
    component: SecurityLogPage,
    data: {
      title: 'Settings',
      robots: 'noindex, nofollow',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
