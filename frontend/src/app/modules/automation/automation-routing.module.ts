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
  },
  {
    path: ROUTER_UTILS.config.automation.dashboard,
    component: AutomationDashboardPage,
  },
  {
    path: ROUTER_UTILS.config.automation.configuration.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('./pages/configuration/configuration.module').then(
        (m) => m.ConfigurationModule,
      ),
    data: {
      title: 'Automation | Configuration',
      robots: 'noindex, nofollow',
      description: 'Automation configurations.',
    },
  },
  {
    path: ROUTER_UTILS.config.automation.specification.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('./pages/specification/specification.module').then(
        (m) => m.SpecificationModule,
      ),
    data: {
      title: 'Automation | Specification',
      robots: 'noindex, nofollow',
      description: 'Automation specifications.',
    },
  },
  {
    path: ROUTER_UTILS.config.automation.microbot.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('./pages/microbot/microbot.module').then((m) => m.MicrobotModule),
    data: {
      title: 'Automation | Microbot',
      robots: 'noindex, nofollow',
      description: 'Automation microbots.',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(automationRoutes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
