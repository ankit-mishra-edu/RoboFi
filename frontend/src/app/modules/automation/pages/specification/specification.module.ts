import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { FilterAutoSpecComponent } from '@modules/automation/components/specifications/filter-auto-spec/filter-auto-spec.component';
import { SpecificationComponent } from '@modules/automation/components/specifications/specification/specification.component';
import { AutomationPipeModule } from '../../pipes/automation-pipe.module';
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
    FilterAutoSpecComponent,
  ],
  imports: [
    CommonModule,
    SpecificationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AutomationPipeModule,
  ],
})
export class SpecificationModule {}
