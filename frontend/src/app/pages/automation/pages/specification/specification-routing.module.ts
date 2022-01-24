import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { CreateSpecificationPage } from './create/create.page';
import { ViewAllSpecificationPage } from './view-all/view-all.page';
import { ViewOrEditSpecificationPage } from './view-or-edit/view-or-edit.page';

const specificationRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.automation.specification.viewAll,
  },
  {
    path: ROUTER_UTILS.config.automation.specification.viewAll,
    component: ViewAllSpecificationPage,
  },
  {
    path: ROUTER_UTILS.config.automation.specification.create,
    component: CreateSpecificationPage,
  },
  {
    path: `${ROUTER_UTILS.config.automation.specification.viewOrEdit}/:id/:mode`,
    component: ViewOrEditSpecificationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(specificationRoutes)],
  exports: [RouterModule],
})
export class SpecificationRoutingModule {}
