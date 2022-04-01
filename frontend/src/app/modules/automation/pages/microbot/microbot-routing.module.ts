import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils';
import { CreateMicrobotPage } from './create/create.page';
import { ViewAllMicrobotPage } from './view-all/view-all.page';
import { ViewOrEditMicrobotPage } from './view-or-edit/view-or-edit.page';

const microbotRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.automation.specification.viewAll,
  },
  {
    path: ROUTER_UTILS.config.automation.specification.viewAll,
    component: ViewAllMicrobotPage,
  },
  {
    path: ROUTER_UTILS.config.automation.specification.create,
    component: CreateMicrobotPage,
  },
  {
    path: `${ROUTER_UTILS.config.automation.specification}/:id/:mode`,
    component: ViewOrEditMicrobotPage,
  },
  {
    path: `${ROUTER_UTILS.config.automation.microbot.viewOrEdit}/:id/:mode`,
    component: ViewOrEditMicrobotPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(microbotRoutes)],
  exports: [RouterModule],
})
export class MicrobotRoutingModule {}
