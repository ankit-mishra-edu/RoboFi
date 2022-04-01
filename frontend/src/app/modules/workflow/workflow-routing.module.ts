import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { EditorComponent } from './pages/editor/editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.workflow.editor,
    data: {
      title: 'Editor',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'editor',
    component: EditorComponent,
    data: {
      title: 'Editor',
      robots: 'noindex, nofollow',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
