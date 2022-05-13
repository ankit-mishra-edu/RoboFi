import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input('spinnerSize') spinnerSize = '1rem';
  @Input('spinnerColor') spinnerColor = 'black';
}
