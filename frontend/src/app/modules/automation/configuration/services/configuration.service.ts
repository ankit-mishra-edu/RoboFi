import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@core/utils';
import { AuthService } from '@modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class AutoConfigService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  CONFIGURATION_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.configuration}`;
  CONFIGURATION_ENTRY_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.configEntry}`;

  // CONFIGURATION CRUD
  configurationByUserId$: Observable<IAutomationConfiguration> = this._http
    .get<IAutomationConfiguration>(this.CONFIGURATION_URL, {
      params: new HttpParams().set('user', this._authService.loggedInUser.id),
    })
    .pipe(share());

  createConfigurationForUser$ = (
    configuration: IAutomationConfiguration,
  ): Observable<IAutomationConfiguration> =>
    this._http
      .post<IAutomationConfiguration>(this.CONFIGURATION_URL, configuration)
      .pipe(share());

  updateConfigurationForUser$ = (
    id: number,
    updatedConfiguration: IAutomationConfiguration,
  ): Observable<IAutomationConfiguration> => {
    return this._http
      .patch<IAutomationConfiguration>(
        `${this.CONFIGURATION_URL}/${id}`,
        updatedConfiguration,
      )
      .pipe(share());
  };

  deleteConfigurationOfUser$ = (
    id: number,
  ): Observable<IAutomationConfiguration> => {
    return this._http
      .delete<IAutomationConfiguration>(`${this.CONFIGURATION_URL}/${id}`)
      .pipe(share());
  };

  // CONFIGURATION ENTRY CRUD
  configEntryById$ = (
    id: number,
  ): Observable<IAutomationConfigurationEntry> => {
    return this._http
      .get<IAutomationConfigurationEntry>(
        `${this.CONFIGURATION_ENTRY_URL}/${id}`,
      )
      .pipe(share());
  };

  updateConfigEntry$ = (
    id: number,
    updatedConfigEntry: IAutomationConfigurationEntry,
  ): Observable<IAutomationConfigurationEntry> => {
    return this._http
      .patch<IAutomationConfigurationEntry>(
        `${this.CONFIGURATION_ENTRY_URL}/${id}`,
        updatedConfigEntry,
      )
      .pipe(share());
  };

  deleteConfigurationEntry$ = (
    id: number,
  ): Observable<IAutomationConfigurationEntry> => {
    return this._http
      .delete<IAutomationConfigurationEntry>(
        `${this.CONFIGURATION_ENTRY_URL}/${id}`,
      )
      .pipe(share());
  };
}
