import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss'],
})
export class HttpLoaderComponent {
  @Input('dimension') dimension = '50px';
}
