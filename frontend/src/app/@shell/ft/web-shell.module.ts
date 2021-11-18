import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@app/@core/guards';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { NotFoundModule } from '@app/@shell/ui/not-found/not-found.module';
import { FooterModule } from '../ui/footer/footer.module';
import { HeaderModule } from '../ui/header/header.module';
import { LayoutModule } from '../ui/layout/layout.module';
import { NotFoundPage } from '../ui/not-found/not-found.page';

const APP_ROUTES: Routes = [
  {
    path: ROUTER_UTILS.config.base.home,
    loadChildren: () =>
      import('@pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: ROUTER_UTILS.config.auth.root,
    canLoad: [NoAuthGuard],
    loadChildren: async () =>
      import('@pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ROUTER_UTILS.config.settings.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: ROUTER_UTILS.config.user.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: ROUTER_UTILS.config.workflow.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('@pages/workflow/workflow.module').then((m) => m.WorkflowModule),
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

// const APP_ROUTES: Routes = [
//   {
//     path: ROUTER_UTILS.config.base.home,
//     loadChildren: async () =>
//       (await import('@pages/home/home.module')).HomeModule,
//   },
//   {
//     path: ROUTER_UTILS.config.auth.root,
//     loadChildren: async () =>
//       (await import('@pages/auth/auth.module')).AuthModule,
//     canLoad: [NoAuthGuard],
//   },
//   {
//     path: ROUTER_UTILS.config.settings.root,
//     loadChildren: async () =>
//       (await import('@pages/settings/settings.module')).SettingsModule,
//     canLoad: [AuthGuard],
//     canActivate: [AuthGuard],
//   },
//   {
//     path: ROUTER_UTILS.config.user.root,
//     loadChildren: async () =>
//       (await import('@pages/user/user.module')).UserModule,
//     canLoad: [AuthGuard],
//     canActivate: [AuthGuard],
//   },
//   {
//     path: ROUTER_UTILS.config.workflow.root,
//     loadChildren: async () =>
//       (await import('@pages/workflow/workflow.module')).WorkflowModule,
//     canLoad: [AuthGuard],
//     canActivate: [AuthGuard],
//   },
//   {
//     path: '**',
//     loadChildren: async () =>
//       (await import('@shell/ui/not-found/not-found.module')).NotFoundModule,
//     component: NotFoundPage,
//   },
// ];

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
