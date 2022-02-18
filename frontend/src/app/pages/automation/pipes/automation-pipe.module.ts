import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterAutomationConfigurationsPipe } from './filter-automation-configurations.pipe';
import { FilterAutomationSpecificationPipe } from './filter-automation-specification.pipe';
import { FilterAutomationMicrobotPipe } from './filter-microbot.pipe';

@NgModule({
  declarations: [
    FilterAutomationConfigurationsPipe,
    FilterAutomationSpecificationPipe,
    FilterAutomationMicrobotPipe,
  ],
  imports: [CommonModule],
  exports: [
    FilterAutomationConfigurationsPipe,
    FilterAutomationSpecificationPipe,
    FilterAutomationMicrobotPipe,
  ],
})
export class AutomationPipeModule {}
