import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-microbot-inputs',
  templateUrl: './microbot-inputs.component.html',
  styleUrls: ['./microbot-inputs.component.scss'],
})
export class MicrobotInputsComponent {
  @Input('Inputs') Inputs!: ISpecificationInput[];
}
