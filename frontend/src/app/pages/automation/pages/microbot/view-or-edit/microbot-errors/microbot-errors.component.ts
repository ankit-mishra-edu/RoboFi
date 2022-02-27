import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-microbot-errors',
  templateUrl: './microbot-errors.component.html',
  styleUrls: ['./microbot-errors.component.scss'],
})
export class MicrobotErrorsComponent implements OnInit {
  constructor() {}

  @Input('Errors') Errors!: ISpecificationError[];

  ngOnInit(): void {}
}
