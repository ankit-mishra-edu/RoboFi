import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoSpecificationStore {
  // CURRENT/SELECTED SPECIFICATION SHARING ACCROSS COMPONENTS
  private _specificationSubject: BehaviorSubject<ISpecification> =
    new BehaviorSubject<ISpecification>({} as ISpecification);

  get specification$(): Observable<ISpecification> {
    return this._specificationSubject.asObservable();
  }

  set specification(specification: ISpecification) {
    this._specificationSubject.next(specification);
  }
}
