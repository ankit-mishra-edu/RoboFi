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

  // CURRENT/SELECTED SPECIFICATION FILTER KEY SHARING ACCROSS COMPONENTS
  private _specificationFilterKeySubject: BehaviorSubject<AutoSpecFilterType> =
    new BehaviorSubject<AutoSpecFilterType>('Name');

  get specificationFilterKey$(): Observable<AutoSpecFilterType> {
    return this._specificationFilterKeySubject.asObservable();
  }

  set specificationFilterKey(specificationFilterKey: AutoSpecFilterType) {
    this._specificationFilterKeySubject.next(specificationFilterKey);
  }
}
