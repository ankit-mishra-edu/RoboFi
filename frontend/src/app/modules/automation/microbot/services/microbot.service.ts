import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@core/utils';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class MicrobotService {
  constructor(private _http: HttpClient) {}

  MICROBOT_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.microbot}`;

  getMicrobots$ = (): Observable<IMicrobot[]> =>
    this._http.get<IMicrobot[]>(this.MICROBOT_URL).pipe(share());

  createMicrobot$ = (microbot: IMicrobot): Observable<IMicrobot> => {
    return this._http
      .post<IMicrobot>(this.MICROBOT_URL, microbot)
      .pipe(share());
  };

  microbotById$ = (id: number): Observable<IMicrobot> => {
    return this._http
      .get<IMicrobot>(`${this.MICROBOT_URL}/${id}`)
      .pipe(share());
  };

  updateMicrobot$ = (
    id: number,
    updatedMicrobot: IMicrobot,
  ): Observable<IMicrobot> => {
    return this._http
      .patch<IMicrobot>(`${this.MICROBOT_URL}/${id}`, updatedMicrobot)
      .pipe(share());
  };

  deleteMicrobot$ = (id: number): Observable<IMicrobot> => {
    return this._http
      .delete<IMicrobot>(`${this.MICROBOT_URL}/${id}`)
      .pipe(share());
  };
}
