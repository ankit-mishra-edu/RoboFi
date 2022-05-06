import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils';
import { AutoConfigService } from '@modules/automation/services/configuration.service';
import { AutoConfigStore } from '@modules/automation/store/configuration/configuration.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class AutomationConfigEntryComponent {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _autoConfigStore: AutoConfigStore,
    private _autoConfigService: AutoConfigService,
  ) {}

  @Input('filteredConfigEntry') configEntry!: IAutomationConfigurationEntry;
  @Input('filteredConfigEntryIndex') configEntryIndex!: number;

  @Output('onConfigurationChange')
  onConfigurationChange: EventEmitter<IAutomationConfigurationEntry> = new EventEmitter<IAutomationConfigurationEntry>();

  addScheduleSubs!: Subscription;
  deleteTriggerSubs!: Subscription;

  DeleteConfigEntry(configEntry: IAutomationConfigurationEntry): void {
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

  EditConfigEntry(configEntry: IAutomationConfigurationEntry): void {
    this._autoConfigStore.configEntry = configEntry;
    this._router.navigate(
      [
        ROUTER_UTILS.config.automation.configuration.entry.root,
        ROUTER_UTILS.config.automation.configuration.entry.viewOrEdit,
        configEntry.id,
        'edit',
      ],
      {
        relativeTo: this._route.parent,
      },
    );
  }

  ViewConfigEntry(configEntry: IAutomationConfigurationEntry): void {
    this._autoConfigStore.configEntry = configEntry;
    this._router.navigate(
      [
        ROUTER_UTILS.config.automation.configuration.entry.root,
        ROUTER_UTILS.config.automation.configuration.entry.viewOrEdit,
        configEntry.id,
        'view',
      ],
      {
        relativeTo: this._route.parent,
      },
    );
  }
}
