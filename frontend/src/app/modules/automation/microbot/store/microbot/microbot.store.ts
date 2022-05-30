import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoMicrobotStore {
  // CURRENT/SELECTED MICROBOT SHARING ACCROSS COMPONENTS
  private _microbotSubject: BehaviorSubject<IMicrobot> =
    new BehaviorSubject<IMicrobot>({} as IMicrobot);

  get microbot$(): Observable<IMicrobot> {
    return this._microbotSubject.asObservable();
  }

  set microbot(microbot: IMicrobot) {
    this._microbotSubject.next(microbot);
  }

  // CURRENT/SELECTED SPECIFICATION FILTER KEY SHARING ACCROSS COMPONENTS
  private _microbotFilterKeySubject: BehaviorSubject<AutoMicrobotFilterType> =
    new BehaviorSubject<AutoMicrobotFilterType>('Name');

  get microbotFilterKey$(): Observable<AutoMicrobotFilterType> {
    return this._microbotFilterKeySubject.asObservable();
  }

  set microbotFilterKey(microbotFilterKey: AutoMicrobotFilterType) {
    this._microbotFilterKeySubject.next(microbotFilterKey);
  }
}
