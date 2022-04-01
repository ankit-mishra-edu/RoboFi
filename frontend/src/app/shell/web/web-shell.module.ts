import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@core/guards';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { NotFoundModule } from '@shell/ui/not-found/not-found.module';
import { FooterModule } from '../ui/footer/footer.module';
import { HeaderModule } from '../ui/header/header.module';
import { LayoutModule } from '../ui/layout/layout.module';
import { NotFoundPage } from '../ui/not-found/not-found.page';

const APP_ROUTES: Routes = [
  {
    path: ROUTER_UTILS.config.base.home,
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: ROUTER_UTILS.config.auth.root,
    canLoad: [NoAuthGuard],
    loadChildren: async () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ROUTER_UTILS.config.settings.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@modules/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: ROUTER_UTILS.config.user.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: ROUTER_UTILS.config.workflow.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@modules/workflow/workflow.module').then((m) => m.WorkflowModule),
  },

  {
    path: ROUTER_UTILS.config.automation.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@modules/automation/automation.module').then(
        (m) => m.AutomationModule,
      ),
  },
  {
    path: '**',
    loadChildren: async () =>
      import('@shell/ui/not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      ),
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES),
    FooterModule,
    HeaderModule,
    LayoutModule,
    NotFoundModule,
  ],
  exports: [
    RouterModule,
    FooterModule,
    HeaderModule,
    LayoutModule,
    NotFoundModule,
  ],
})
export class WebShellModule {}
