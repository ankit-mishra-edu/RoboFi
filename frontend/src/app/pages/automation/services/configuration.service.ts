import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@app/@core/utils/endpoints';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  CONFIGURATION_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.configuration}`;

  configurationByUserId$: Observable<IConfiguration> = this._http
    .get<IConfiguration>(this.CONFIGURATION_URL, {
      params: new HttpParams().set('user', this._authService.loggedInUser.id),
    })
    .pipe(share());
}
