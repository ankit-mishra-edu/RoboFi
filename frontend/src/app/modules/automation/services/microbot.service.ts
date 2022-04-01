import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@core/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MicrobotService {
  constructor(private _http: HttpClient) {}

  MICROBOT_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.microbot}`;

  // CURRENT/SELECTED MICROBOT SHARING ACCROSS COMPONENTS
  private _microbotSubject: BehaviorSubject<IMicrobot> =
    new BehaviorSubject<IMicrobot>({} as IMicrobot);

  get microbot$(): Observable<IMicrobot> {
    return this._microbotSubject.asObservable();
  }

  set microbot(microbot: IMicrobot) {
    this._microbotSubject.next(microbot);
  }

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
