import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@core/utils';
import { AuthService } from '@modules/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutomationConfigurationService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  CONFIGURATION_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.configuration}`;
  CONFIGURATION_ENTRY_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.configEntry}`;

  // CURRENT/SELECTED CONFIGURATION TO BE SHARED ACROSS COMPONENTS
  private _configurationSubject: BehaviorSubject<IAutomationConfiguration> =
    new BehaviorSubject<IAutomationConfiguration>(
      {} as IAutomationConfiguration,
    );

  get configuration$(): Observable<IAutomationConfiguration> {
    return this._configurationSubject.asObservable();
  }

  set configuration(configurationData: IAutomationConfiguration) {
    this._configurationSubject.next(configurationData);
  }

  // CURRENT/SELECTED CONFIGURATION ENTRY TO BE SHARED ACROSS COMPONENTS
  private _configEntrySubject: BehaviorSubject<IAutomationConfigurationEntry> =
    new BehaviorSubject<IAutomationConfigurationEntry>(
      {} as IAutomationConfigurationEntry,
    );

  get configEntry$(): Observable<IAutomationConfigurationEntry> {
    return this._configEntrySubject.asObservable();
  }

  set configEntry(configEntryData: IAutomationConfigurationEntry) {
    this._configEntrySubject.next(configEntryData);
  }

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
