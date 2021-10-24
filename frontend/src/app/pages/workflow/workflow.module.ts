import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConnectorComponent } from './components/connector/connector.component';
import { NodeComponent } from './components/node/node.component';
import { DraggableDirective } from './directives/draggable.directive';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { EditorComponent } from './pages/editor/editor.component';

@NgModule({
  declarations: [NodeComponent, ConnectorComponent, DraggableDirective, EditorComponent],
  imports: [CommonModule, WorkflowRoutingModule],
})
export class WorkflowModule {}
