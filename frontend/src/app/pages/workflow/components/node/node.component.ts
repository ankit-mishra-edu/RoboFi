import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Workflow, WorkflowNode } from '../../models/workflow';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  xOffset = 0;
  yOffset = 0;

  @Input() gridSize = 1;
  @Input() container!: any;
  @Input() node!: WorkflowNode;
  @Input() workflow!: Workflow;

  @ViewChild('nodeView') nodeViewRef: any;

  ngOnInit(): void {
    this.xOffset = this.node.x || 0;
    this.yOffset = this.node.y || 0;
  }

  onMove(e: any): void {
    if (this.workflow.draggable) {
      this.node.x = e.x;
      this.node.y = e.y;
    }
  }

  onRelease(e: any): void {
    // Snap to grid on release
    if (this.workflow.draggable) {
      const x = this.node.x ? this.node.x : 0;
      const y = this.node.y ? this.node.y : 0;
      this.node.x = Math.floor(x / this.gridSize) * this.gridSize;
      this.node.y = Math.floor(y / this.gridSize) * this.gridSize;
    }
  }

  connectorSelected(event: any): void {
    this.workflow.startCreatingConnection(this.sideOf(event.target), this.node);
  }

  connectorReleased(event: any): void {
    this.workflow.finishCreatingConnection(
      this.sideOf(event.target),
      this.node,
    );
  }

  sideOf(target: HTMLElement): 'top' | 'left' | 'bottom' | 'right' | undefined {
    const sideClass = Array.from(target.classList).find(
      (cl) => cl.toString().indexOf('connector-') === 0,
    );
    if (sideClass) {
      const side = sideClass.toString().replace('connector-', '');
      if (['top', 'left', 'right', 'bottom'].indexOf(side) >= 0) {
        return side as 'top' | 'left' | 'right' | 'bottom';
      }
    }
    return undefined;
  }
}
