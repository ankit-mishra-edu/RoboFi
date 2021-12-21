import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/@core/guards';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';

const automationRoutes: Routes = [
  {
    path: ROUTER_UTILS.config.automation.specification.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('./pages/specification/specification.module').then(
        (m) => m.SpecificationModule,
      ),
  },
  {
    path: ROUTER_UTILS.config.automation.microbot.root,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: async () =>
      import('./pages/microbot/microbot.module').then((m) => m.MicrobotModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(automationRoutes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
