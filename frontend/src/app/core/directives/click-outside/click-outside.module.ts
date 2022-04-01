import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DraggableDirective } from '../draggable.directive';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [ClickOutsideDirective, DraggableDirective],
  imports: [CommonModule],
  exports: [ClickOutsideDirective, DraggableDirective],
})
export class ClickOutsideModule {}
