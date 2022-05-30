import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { SpecificationService } from '../specification/services/specification.service';
import { FilterAutoMicrobotComponent } from './components/microbot-filter-auto/microbot-filter-auto.component';
import { MicrobotComponent } from './components/microbot/microbot.component';
import { MicrobotRoutingModule } from './microbot-routing.module';
import { CreateMicrobotPage } from './pages/create/create.page';
import { MicrobotErrorsComponent } from './pages/create/microbot-errors/microbot-errors.component';
import { MicrobotInputsComponent } from './pages/create/microbot-inputs/microbot-inputs.component';
import { MicrobotOutputsComponent } from './pages/create/microbot-outputs/microbot-outputs.component';
import { ViewAllMicrobotPage } from './pages/view-all/view-all.page';
import { ViewOrEditMicrobotPage } from './pages/view-or-edit/view-or-edit.page';
import { MicrobotPipeModule } from './pipes/microbot-pipe.module';
import { MicrobotService } from './services/microbot.service';

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
