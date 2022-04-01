import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutomationPipeModule } from '../../pipes/automation-pipe.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AutomationAddConfigEntryPage } from './create/create.page';
import { AutomationConfigEntryComponent } from './view-all/entry/entry.component';
import { AutomationViewAllConfigurationPage } from './view-all/view-all.page';
import { AutomationViewOrEditConfigEntryPage } from './view-or-edit/view-or-edit.page';

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
    AutomationPipeModule,
  ],
})
export class ConfigurationModule {}
