import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutomationConfigurationService } from '@app/pages/automation/services/configuration.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class AutomationConfigEntryComponent implements OnInit {
  constructor(private _autoConfigService: AutomationConfigurationService) {}

  @Input('filteredConfigEntry') configEntry!: IAutomationConfigurationEntry;
  @Input('filteredConfigEntryIndex') configEntryIndex!: number;

  @Output('onConfigurationChange')
  onConfigurationChange: EventEmitter<IAutomationConfigurationEntry> = new EventEmitter<IAutomationConfigurationEntry>();

  addScheduleSubs!: Subscription;
  deleteTriggerSubs!: Subscription;

  ngOnInit(): void {}

  DeleteConfigEntry(configEntry: IAutomationConfigurationEntry) {
    if (
      confirm(
        `Do you want to delete the Configuration entry with name ${configEntry.name} ?\n
It will delete this entry from user's configuration.`,
      )
    ) {
      this.deleteTriggerSubs = this._autoConfigService
        .deleteConfigurationEntry$(configEntry.id)
        .subscribe((deletedConfigEntry: IAutomationConfigurationEntry) => {
          this.onConfigurationChange.emit(deletedConfigEntry);
        });
    }
  }

  EditConfigEntry(configEntry: IAutomationConfigurationEntry) {
    if (
      confirm(
        `Do you want to delete the Configuration entry with name ${configEntry.name} ?\n
It will delete this entry from user's configuration.`,
      )
    ) {
      this.deleteTriggerSubs = this._autoConfigService
        .updateConfigEntry$(configEntry.id, configEntry)
        .subscribe();
    }
  }
}
