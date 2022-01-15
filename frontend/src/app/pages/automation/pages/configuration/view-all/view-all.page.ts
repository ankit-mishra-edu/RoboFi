import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class AutomationViewAllConfigurationPage implements OnInit {
  constructor(private _configurationService: ConfigurationService) {}
  automationConfigurationByUserId$!: Observable<IAutomationConfiguration>;

  ngOnInit(): void {
    this.automationConfigurationByUserId$ =
      this._configurationService.automationConfigurationByUserId$.pipe(share());
  }
}
