import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { EditorComponent } from './pages/editor/editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.workflow.editor,
  },
  {
    path: 'editor',
    component: EditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
