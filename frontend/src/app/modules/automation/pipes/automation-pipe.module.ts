import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationPipeModule } from './configuration/configuration-pipe.module';
import { MicrobotPipeModule } from './microbot/microbot-pipe.module';
import { SpecificationPipeModule } from './specification/specification-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    MicrobotPipeModule,
    ConfigurationPipeModule,
    SpecificationPipeModule,
  ],
  exports: [
    MicrobotPipeModule,
    ConfigurationPipeModule,
    SpecificationPipeModule,
  ],
})
export class AutomationPipeModule {}
