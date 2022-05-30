import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterMicrobotsPipe } from './filter-microbot.pipe';

@NgModule({
  declarations: [FilterMicrobotsPipe],
  imports: [CommonModule],
  exports: [FilterMicrobotsPipe],
})
export class MicrobotPipeModule {}
