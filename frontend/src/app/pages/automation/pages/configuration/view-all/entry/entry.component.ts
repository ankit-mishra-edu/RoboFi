import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-config-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class AutomationConfigEntryComponent implements OnInit {
  constructor() {}

  @Input('filteredConfigEntry') configEntry!: IAutomationConfigurationEntry;
  @Input('filteredConfigEntryIndex') configEntryIndex!: number;

  @Output('deletedConfigEntry')
  deletedConfigEntry: EventEmitter<IAutomationConfigurationEntry> = new EventEmitter<IAutomationConfigurationEntry>();

  ngOnInit(): void {}
}
