import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpLoaderComponent } from './http-loader/http-loader.component';

@NgModule({
  declarations: [SpinnerComponent, SearchBoxComponent, HttpLoaderComponent],
  imports: [CommonModule, FormsModule],
  exports: [SpinnerComponent, SearchBoxComponent, HttpLoaderComponent],
})
export class SharedModule {}
