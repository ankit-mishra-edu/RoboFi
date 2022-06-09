import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@core/guards';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { LayoutModule } from '../ui/layout/layout.module';
import { NotFoundPage } from '../ui/not-found/not-found.page';

const APP_ROUTES: Routes = [
  {
    path: ROUTER_UTILS.config.base.home,
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
    data: {
      title: 'Home',
      robots: 'index, follow',
      description: 'Application homepage.',
    },
  },
  {
    path: ROUTER_UTILS.config.auth.root,
    canLoad: [NoAuthGuard],
    loadChildren: async () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
    data: {
      title: 'Authentication',
      robots: 'index, follow',
      description: 'User authentications.',
    },
  },
  {
    path: ROUTER_UTILS.config.settings.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@modules/settings/settings.module').then((m) => m.SettingsModule),
    data: {
      title: 'Settings',
      robots: 'index, follow',
      description: 'Applications settings.',
    },
  },
  {
    path: ROUTER_UTILS.config.user.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@modules/user/user.module').then((m) => m.UserModule),
    data: {
      title: 'User',
      robots: 'index, follow',
      description: 'User details.',
    },
  },
  {
    path: ROUTER_UTILS.config.automation.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@modules/automation/automation.module').then(
        (m) => m.AutomationModule,
      ),
    data: {
      title: 'Automation',
      robots: 'index, follow',
      description: 'Automation module.',
    },
  },
  {
    path: '**',
    loadChildren: async () =>
      import('@shell/ui/not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      ),
    component: NotFoundPage,
    data: {
      title: 'Not Found',
      robots: 'index, follow',
      description: 'Page not found.',
    },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule, LayoutModule],
})
export class WebShellModule {}
