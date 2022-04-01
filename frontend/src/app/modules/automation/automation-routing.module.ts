import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';
import { ROUTER_UTILS } from '@core/utils';
import { AutomationDashboardPage } from './pages/dashboard/dashboard.page';
import { AutomationHomePage } from './pages/home/home.page';

const automationRoutes: Routes = [
  {
    path: ROUTER_UTILS.config.automation.home,
    component: AutomationHomePage,
    data: {
      title: 'Automation | Home',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.automation.dashboard,
    component: AutomationDashboardPage,
    data: {
      title: 'Automation | Dashboard',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: ROUTER_UTILS.config.automation.configuration.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      title: 'Automation | Configuration',
      robots: 'noindex, nofollow',
    },
    loadChildren: async () =>
      import('./pages/configuration/configuration.module').then(
        (m) => m.ConfigurationModule,
      ),
  },
  {
    path: ROUTER_UTILS.config.automation.specification.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      title: 'Automation | Specification',
      robots: 'noindex, nofollow',
    },
    loadChildren: async () =>
      import('./pages/specification/specification.module').then(
        (m) => m.SpecificationModule,
      ),
  },
  {
    path: ROUTER_UTILS.config.automation.microbot.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      title: 'Automation | Microbot',
      robots: 'noindex, nofollow',
    },
    loadChildren: async () =>
      import('./pages/microbot/microbot.module').then((m) => m.MicrobotModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(automationRoutes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
