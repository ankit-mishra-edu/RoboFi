import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterSpecificationsPipe } from './filter-specifications.pipe';

@NgModule({
  declarations: [FilterSpecificationsPipe],
  imports: [CommonModule],
  exports: [FilterSpecificationsPipe],
})
export class SpecificationPipeModule {}
