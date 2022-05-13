import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AutomationAddConfigEntryPage } from './create/create.page';
import { AutomationConfigEntryComponent } from '../../components/configurations/entry/entry.component';
import { AutomationViewAllConfigurationPage } from './view-all/view-all.page';
import { AutomationViewOrEditConfigEntryPage } from './view-or-edit/view-or-edit.page';
import { ConfigurationPipeModule } from '@modules/automation/pipes/configuration/configuration-pipe.module';

@NgModule({
  declarations: [
    AutomationViewAllConfigurationPage,
    AutomationConfigEntryComponent,
    AutomationAddConfigEntryPage,
    AutomationViewOrEditConfigEntryPage,
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ConfigurationPipeModule,
  ],
})
export class ConfigurationModule {}
