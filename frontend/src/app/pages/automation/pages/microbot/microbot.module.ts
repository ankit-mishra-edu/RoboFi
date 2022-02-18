import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutomationPipeModule } from '../../pipes/automation-pipe.module';
import { MicrobotRoutingModule } from './microbot-routing.module';
import { MicrobotComponent } from './view-all/microbot/microbot.component';
import { ViewAllMicrobotPage } from './view-all/view-all.page';

@NgModule({
  declarations: [MicrobotComponent, ViewAllMicrobotPage],
  imports: [
    CommonModule,
    MicrobotRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AutomationPipeModule,
  ],
})
export class MicrobotModule {}
