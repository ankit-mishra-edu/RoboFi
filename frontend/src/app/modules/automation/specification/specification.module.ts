import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutoSpecFilterComponent } from './components/auto-spec-filter/auto-spec-filter.component';
import { SpecificationComponent } from './components/specification/specification.component';
import { CreateSpecificationPage } from './pages/create/create.page';
import { ViewAllSpecificationPage } from './pages/view-all/view-all.page';
import { ViewOrEditSpecificationPage } from './pages/view-or-edit/view-or-edit.page';
import { SpecificationPipeModule } from './pipes/specification-pipe.module';
import { SpecificationService } from './services/specification.service';
import { SpecificationRoutingModule } from './specification-routing.module';

@NgModule({
  declarations: [
    ViewAllSpecificationPage,
    CreateSpecificationPage,
    ViewOrEditSpecificationPage,
    SpecificationComponent,
    AutoSpecFilterComponent,
  ],
  imports: [
    CommonModule,
    SpecificationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SpecificationPipeModule,
  ],
  providers: [SpecificationService],
})
export class SpecificationModule {}
