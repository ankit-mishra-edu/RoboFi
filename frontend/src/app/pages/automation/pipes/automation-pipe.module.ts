import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterAutomationConfigurationsPipe } from './filter-automation-configurations.pipe';
import { FilterAutomationSpecificationPipe } from './filter-automation-specification.pipe';

@NgModule({
  declarations: [
    FilterAutomationConfigurationsPipe,
    FilterAutomationSpecificationPipe,
  ],
  imports: [CommonModule],
  exports: [
    FilterAutomationConfigurationsPipe,
    FilterAutomationSpecificationPipe,
  ],
})
export class AutomationPipeModule {}
