import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HtmlPipe } from '../html.pipe';
import { BytesPipe } from './bytes.pipe';

@NgModule({
  declarations: [BytesPipe, HtmlPipe],
  imports: [CommonModule],
  exports: [BytesPipe, HtmlPipe],
})
export class BytesModule {}
