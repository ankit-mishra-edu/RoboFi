import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils';
import { AutomationAddConfigEntryPage } from './pages/create/create.page';
import { AutomationViewAllConfigurationPage } from './pages/view-all/view-all.page';
import { AutomationViewOrEditConfigEntryPage } from './pages/view-or-edit/view-or-edit.page';

const configurationRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.automation.configuration.viewAll,
  },
  {
    path: ROUTER_UTILS.config.automation.configuration.viewAll,
    component: AutomationViewAllConfigurationPage,
  },
  {
    path: `${ROUTER_UTILS.config.automation.configuration.entry.root}`,
    children: [
      {
        path: `${ROUTER_UTILS.config.automation.configuration.entry.create}`,
        component: AutomationAddConfigEntryPage,
      },
      {
        path: `${ROUTER_UTILS.config.automation.configuration.entry.viewOrEdit}/:id/:mode`,
        component: AutomationViewOrEditConfigEntryPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
