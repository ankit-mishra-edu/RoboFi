import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutomationPipeModule } from '../../pipes/automation-pipe.module';
import { CreateMicrobotPage } from './create/create.page';
import { MicrobotErrorsComponent } from './create/microbot-errors/microbot-errors.component';
import { MicrobotInputsComponent } from './create/microbot-inputs/microbot-inputs.component';
import { MicrobotOutputsComponent } from './create/microbot-outputs/microbot-outputs.component';
import { MicrobotRoutingModule } from './microbot-routing.module';
import { MicrobotComponent } from './view-all/microbot/microbot.component';
import { ViewAllMicrobotPage } from './view-all/view-all.page';

@NgModule({
  declarations: [
    CreateMicrobotPage,
    MicrobotComponent,
    ViewAllMicrobotPage,
    MicrobotInputsComponent,
    MicrobotOutputsComponent,
    MicrobotErrorsComponent,
  ],
  imports: [
    CommonModule,
    MicrobotRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AutomationPipeModule,
  ],
})
export class MicrobotModule {}
