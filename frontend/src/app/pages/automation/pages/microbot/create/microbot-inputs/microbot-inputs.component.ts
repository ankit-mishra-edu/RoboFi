import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-microbot-inputs',
  templateUrl: './microbot-inputs.component.html',
  styleUrls: ['./microbot-inputs.component.scss'],
})
export class MicrobotInputsComponent implements OnInit {
  constructor() {}

  @Input('Inputs') Inputs!: ISpecificationInput[];

  ngOnInit(): void {}
}
