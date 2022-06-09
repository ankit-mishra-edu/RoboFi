import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils';
import { WorkflowEditorPage } from './pages/editor/editor.page';
import { WorkflowHomePage } from './pages/home/home.page';

const workflowRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTER_UTILS.config.automation.workflow.home,
  },
  {
    path: ROUTER_UTILS.config.automation.workflow.home,
    component: WorkflowHomePage,
  },
  {
    path: ROUTER_UTILS.config.automation.workflow.editor,
    component: WorkflowEditorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(workflowRoutes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
