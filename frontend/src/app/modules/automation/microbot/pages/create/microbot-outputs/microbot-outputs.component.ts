import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-microbot-outputs',
  templateUrl: './microbot-outputs.component.html',
  styleUrls: ['./microbot-outputs.component.scss'],
})
export class MicrobotOutputsComponent {
  @Input('Outputs') Outputs!: ISpecificationOutput[];
}
