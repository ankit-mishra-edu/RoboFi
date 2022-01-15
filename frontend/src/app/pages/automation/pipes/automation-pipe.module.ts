import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterAutomationConfigurationsPipe } from './filter-automation-configurations.pipe';

@NgModule({
  declarations: [FilterAutomationConfigurationsPipe],
  imports: [CommonModule],
  exports: [FilterAutomationConfigurationsPipe],
})
export class AutomationPipeModule {}
