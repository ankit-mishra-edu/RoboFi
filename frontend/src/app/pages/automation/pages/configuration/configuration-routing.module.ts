import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AutomationViewAllConfigurationPage } from './view-all/view-all.page';

const configurationRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.automation.configuration.viewAll,
  },
  {
    path: ROUTER_UTILS.config.automation.configuration.viewAll,
    component: AutomationViewAllConfigurationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
