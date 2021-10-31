import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, SearchBoxComponent],
  imports: [CommonModule, FormsModule],
  exports: [SpinnerComponent, SearchBoxComponent],
})
export class SharedModule {}
