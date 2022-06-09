import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@components/shared.module';
import { MicrobotListByCategoryComponent } from './components/microbot-list-by-category/microbot-list-by-category.component';
import { PropertiesPanelComponent } from './components/properties-panel/properties-panel.component';
import { WorkflowEditorPage } from './pages/editor/editor.page';
import { WorkflowHomePage } from './pages/home/home.page';
import { WorkflowRoutingModule } from './workflow-routing.module';

@NgModule({
  declarations: [
    WorkflowHomePage,
    WorkflowEditorPage,
    MicrobotListByCategoryComponent,
    PropertiesPanelComponent,
  ],
  imports: [CommonModule, WorkflowRoutingModule, SharedModule],
})
export class WorkflowModule {}
