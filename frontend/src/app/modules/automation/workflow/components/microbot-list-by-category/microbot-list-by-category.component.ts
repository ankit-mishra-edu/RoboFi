import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-microbot-list-by-category',
  templateUrl: './microbot-list-by-category.component.html',
  styleUrls: ['./microbot-list-by-category.component.scss'],
})
export class MicrobotListByCategoryComponent {
  @Input('microbotsByCategory') microbotsByCategory!: IMicrobotByCategory;
}
