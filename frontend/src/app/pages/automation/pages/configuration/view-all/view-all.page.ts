import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AutomationConfigurationService } from '../../../services/configuration.service';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class AutomationViewAllConfigurationPage implements OnInit {
  constructor(private _autoConfigService: AutomationConfigurationService) {}
  configurationByUserId$!: Observable<IAutomationConfiguration>;

  ngOnInit(): void {
    this.configurationByUserId$ =
      this._autoConfigService.configurationByUserId$.pipe(share());
  }

  onConfigEntryDelete(_: IAutomationConfigurationEntry) {
    this.ngOnInit();
  }
}
