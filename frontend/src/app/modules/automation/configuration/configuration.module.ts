import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/components/shared.module';
import { AutomationConfigEntryComponent } from './components/entry/entry.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AutomationAddConfigEntryPage } from './pages/create/create.page';
import { AutomationViewAllConfigurationPage } from './pages/view-all/view-all.page';
import { AutomationViewOrEditConfigEntryPage } from './pages/view-or-edit/view-or-edit.page';
import { ConfigurationPipeModule } from './pipes/configuration-pipe.module';
import { AutoConfigService } from './services/configuration.service';

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
  providers: [AutoConfigService],
})
export class ConfigurationModule {}
