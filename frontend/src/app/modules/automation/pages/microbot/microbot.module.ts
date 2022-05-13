import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { CreateMicrobotPage } from './create/create.page';
import { MicrobotErrorsComponent } from './create/microbot-errors/microbot-errors.component';
import { MicrobotInputsComponent } from './create/microbot-inputs/microbot-inputs.component';
import { MicrobotOutputsComponent } from './create/microbot-outputs/microbot-outputs.component';
import { MicrobotRoutingModule } from './microbot-routing.module';
import { MicrobotComponent } from '../../components/microbots/microbot/microbot.component';
import { ViewAllMicrobotPage } from './view-all/view-all.page';
import { ViewOrEditMicrobotPage } from './view-or-edit/view-or-edit.page';
import { FilterAutoMicrobotComponent } from '@modules/automation/components/microbots/microbot-filter-auto/microbot-filter-auto.component';
import { MicrobotPipeModule } from '@modules/automation/pipes/microbot/microbot-pipe.module';
import { MicrobotService } from '@modules/automation/services/microbot.service';
import { SpecificationService } from '@modules/automation/services/specification.service';

@NgModule({
  declarations: [
    CreateMicrobotPage,
    MicrobotComponent,
    ViewAllMicrobotPage,
    MicrobotInputsComponent,
    MicrobotOutputsComponent,
    MicrobotErrorsComponent,
    ViewOrEditMicrobotPage,
    FilterAutoMicrobotComponent,
  ],
  imports: [
    CommonModule,
    MicrobotRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MicrobotPipeModule,
  ],
  providers: [MicrobotService, SpecificationService],
})
export class MicrobotModule {}
