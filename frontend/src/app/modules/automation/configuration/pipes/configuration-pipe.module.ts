import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterConfigurationsPipe } from './filter-configs.pipe';

@NgModule({
  declarations: [FilterConfigurationsPipe],
  imports: [CommonModule],
  exports: [FilterConfigurationsPipe],
})
export class ConfigurationPipeModule {}
