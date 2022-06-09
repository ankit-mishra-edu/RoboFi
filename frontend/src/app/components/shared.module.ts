import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpLoaderComponent } from './http-loader/http-loader.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, SearchBoxComponent, HttpLoaderComponent],
  imports: [CommonModule, FormsModule],
  exports: [
    SpinnerComponent,
    SearchBoxComponent,
    HttpLoaderComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
