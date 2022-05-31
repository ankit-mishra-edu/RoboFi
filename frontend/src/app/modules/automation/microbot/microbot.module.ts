import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { FilterAutoMicrobotComponent } from './components/auto-microbot-filter/microbot-filter-auto.component';
import { MicrobotErrorsComponent } from './components/microbot-errors/microbot-errors.component';
import { MicrobotInputsComponent } from './components/microbot-inputs/microbot-inputs.component';
import { MicrobotOutputsComponent } from './components/microbot-outputs/microbot-outputs.component';
import { MicrobotComponent } from './components/microbot/microbot.component';
import { MicrobotRoutingModule } from './microbot-routing.module';
import { CreateMicrobotPage } from './pages/create/create.page';
import { ViewAllMicrobotPage } from './pages/view-all/view-all.page';
import { ViewOrEditMicrobotPage } from './pages/view-or-edit/view-or-edit.page';
import { MicrobotPipeModule } from './pipes/microbot-pipe.module';

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
})
export class MicrobotModule {}
