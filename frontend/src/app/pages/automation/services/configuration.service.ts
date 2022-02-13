import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@app/@core/utils/endpoints';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutomationConfigurationService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  CONFIGURATION_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.configuration}`;

  configurationByUserId$: Observable<IAutomationConfiguration> = this._http
    .get<IAutomationConfiguration>(this.CONFIGURATION_URL, {
      params: new HttpParams().set('user', this._authService.loggedInUser.id),
    })
    .pipe(share());

  configEntryById$ = (id: number): Observable<IAutomationConfiguration> => {
    return this._http
      .get<IAutomationConfiguration>(`${this.CONFIGURATION_URL}/${id}`)
      .pipe(share());
  };

  updateConfigEntry$ = (
    id: number,
    updatedConfigEntry: IAutomationConfigurationEntry,
    originalConfiguration: IAutomationConfiguration,
  ): Observable<IAutomationConfiguration> => {
    // originalConfiguration.entries
    return this._http
      .patch<IAutomationConfiguration>(
        `${this.CONFIGURATION_URL}/${id}`,
        updatedConfigEntry,
      )
      .pipe(share());
  };

  deleteSpecification$ = (id: number): Observable<IAutomationConfiguration> => {
    return this._http
      .delete<IAutomationConfiguration>(`${this.CONFIGURATION_URL}/${id}`)
      .pipe(share());
  };
}
