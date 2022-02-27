import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-microbot-outputs',
  templateUrl: './microbot-outputs.component.html',
  styleUrls: ['./microbot-outputs.component.scss'],
})
export class MicrobotOutputsComponent implements OnInit {
  constructor() {}

  @Input('Outputs') Outputs!: ISpecificationOutput[];

  ngOnInit(): void {}
}
