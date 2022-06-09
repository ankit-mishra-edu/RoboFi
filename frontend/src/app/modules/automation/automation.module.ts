import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutomationRoutingModule } from './automation-routing.module';
import { AutoConfigService } from './configuration/services/configuration.service';
import { MicrobotService } from './microbot/services/microbot.service';
import { SpecificationService } from './specification/services/specification.service';
import { WorkflowModule } from './workflow/workflow.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AutomationRoutingModule, WorkflowModule],
  providers: [AutoConfigService, MicrobotService, SpecificationService],
})
export class AutomationModule {}
