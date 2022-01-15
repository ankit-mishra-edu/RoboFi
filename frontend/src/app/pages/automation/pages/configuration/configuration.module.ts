import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutomationPipeModule } from '../../pipes/automation-pipe.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AutomationViewAllConfigurationPage } from './view-all/view-all.page';

@NgModule({
  declarations: [AutomationViewAllConfigurationPage],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AutomationPipeModule,
  ],
})
export class ConfigurationModule {}
