import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class AutomationViewAllConfigurationPage implements OnInit {
  constructor(private _configurationService: ConfigurationService) {}
  configurationByUserId$!: Observable<IConfiguration>;

  ngOnInit(): void {
    this.configurationByUserId$ =
      this._configurationService.configurationByUserId$;
  }
}
