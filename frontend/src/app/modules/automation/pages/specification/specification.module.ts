import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutoSpecFilterComponent } from '@modules/automation/components/specifications/auto-spec-filter/auto-spec-filter.component';
import { SpecificationComponent } from '@modules/automation/components/specifications/specification/specification.component';
import { SpecificationPipeModule } from '@modules/automation/pipes/specification/specification-pipe.module';
import { CreateSpecificationPage } from './create/create.page';
import { SpecificationRoutingModule } from './specification-routing.module';
import { ViewAllSpecificationPage } from './view-all/view-all.page';
import { ViewOrEditSpecificationPage } from './view-or-edit/view-or-edit.page';

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
})
export class SpecificationModule {}
