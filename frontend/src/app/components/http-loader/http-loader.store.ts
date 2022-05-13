import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpLoaderStore {
  // HTTP WAITING FOR THE RESPONSE FROM BACKEND
  private _isWaitingForResponseSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get waitingForResponse$(): Observable<boolean> {
    return this._isWaitingForResponseSubject.asObservable();
  }

  set waitingForResponse(isWaiting: boolean) {
    this._isWaitingForResponseSubject.next(isWaiting);
  }
}
