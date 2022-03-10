import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-microbot-errors',
  templateUrl: './microbot-errors.component.html',
  styleUrls: ['./microbot-errors.component.scss'],
})
export class MicrobotErrorsComponent {
  @Input('Errors') Errors!: ISpecificationError[];
}
