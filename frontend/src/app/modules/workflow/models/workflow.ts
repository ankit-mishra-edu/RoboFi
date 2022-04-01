export class WorkflowNode {
  id!: string;
  title!: string;
  x?: number;
  y?: number;
  click?: (workflowNode: WorkflowNode) => void;

  constructor(title: string, id: string, x?: number, y?: number) {
    this.title = title;
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

export class WorkflowConnection {
  from!: WorkflowNode;
  to!: WorkflowNode;
  title?: string;
  fromSide?: 'top' | 'left' | 'bottom' | 'right' = 'right';
  toSide?: 'top' | 'left' | 'bottom' | 'right' = 'left';
  color?: string;
  click?: (connection: WorkflowConnection) => void;
}

export class XYCoordinates {
  x!: number;
  y!: number;
  width?: number;
  angle?: number;
  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

export class Workflow {
  draggable = true;
  allowCircular = false;

  nodes!: WorkflowNode[];
  connections!: WorkflowConnection[];

  creatingConnection!: WorkflowConnection;

  startCreatingConnection(
    fromSide: 'top' | 'left' | 'bottom' | 'right' = 'right',
    fromNode: WorkflowNode,
  ): void {
    this.creatingConnection = new WorkflowConnection();

    this.creatingConnection.from = fromNode;
    this.creatingConnection.fromSide = fromSide;
    this.draggable = false;
  }

  finishCreatingConnection(
    toSide: 'top' | 'left' | 'bottom' | 'right' = 'right',
    toNode: WorkflowNode,
  ): void {
    const newConnection = Object.assign(
      new WorkflowConnection(),
      this.creatingConnection,
    );

    newConnection.toSide = toSide;
    newConnection.to = toNode;

    if (newConnection.from.title || newConnection.to.title) {
      newConnection.title = `${newConnection.from.title} to ${newConnection.to.title}`;
    }

    if (newConnection.from === newConnection.to) {
      console.warn('Cannot move from same node to same node.');
      return;
    }

    if (!this.allowCircular) {
      // See if a connection exists from newConnection.to & newConnection.from
      const circular = this.connections.find(
        (c) => c.from == newConnection.to && c.to == newConnection.from,
      );
      if (circular) {
        console.warn(
          'Circular dependency detected. If this was intended, set [allowCircular]="true".',
        );
        this.discardCurrentConnection();
        return;
      }
    }

    this.connections.push(newConnection);
    this.discardCurrentConnection();
  }

  discardCurrentConnection(): void {
    this.creatingConnection = <WorkflowConnection>{};
    this.draggable = true;
  }

  deleteNode(node: WorkflowNode): void {
    const index = this.nodes.indexOf(node);
    if (index >= 0) {
      // First delete connections to and from node:
      this.connections
        .filter((c) => c.from == node || c.to == node)
        .forEach((c) => this.deleteConnection(c));
      this.nodes.splice(index, 1);
    }
  }

  deleteConnection(connection: WorkflowConnection): void {
    console.log(connection);
    const index = this.connections.indexOf(connection);
    if (index >= 0) {
      this.connections.splice(index, 1);
    }
  }
}
