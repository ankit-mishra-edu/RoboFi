import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutomationPipeModule } from '../../pipes/automation-pipe.module';
import { CreateSpecificationPage } from './create/create.page';
import { SpecificationRoutingModule } from './specification-routing.module';
import { SpecificationComponent } from './view-all/specification/specification.component';
import { ViewAllSpecificationPage } from './view-all/view-all.page';
import { ViewOrEditSpecificationPage } from './view-or-edit/view-or-edit.page';

@NgModule({
  declarations: [
    ViewAllSpecificationPage,
    CreateSpecificationPage,
    ViewOrEditSpecificationPage,
    SpecificationComponent,
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
