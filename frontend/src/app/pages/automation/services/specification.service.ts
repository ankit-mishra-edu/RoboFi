import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@app/@core/utils/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpecificationService {
  constructor(private _http: HttpClient) {}

  SPECIFICATION_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/${ENDPOINT_UTILS.config.automation.specification}`;

  // CURRENT/SELECTED SPECIFICATION SHARING ACCROSS COMPONENTS
  private _specificationSubject: BehaviorSubject<ISpecification> =
    new BehaviorSubject<ISpecification>({} as ISpecification);

  get specification$() {
    return this._specificationSubject.asObservable();
  }

  set specification(specification: ISpecification) {
    this._specificationSubject.next(specification);
  }

  allSpecifications$: Observable<ISpecification[]> = this._http
    .get<ISpecification[]>(this.SPECIFICATION_URL)
    .pipe(share());

  CreateSpecification$ = (
    specification: ISpecification,
  ): Observable<ISpecification> => {
    return this._http
      .post<ISpecification>(this.SPECIFICATION_URL, specification)
      .pipe(share());
  };

  specificationById$ = (id: number): Observable<ISpecification> => {
    return this._http
      .get<ISpecification>(`${this.SPECIFICATION_URL}/${id}`)
      .pipe(share());
  };

  updateSpecification$ = (
    id: number,
    updatedSpecification: ISpecification,
  ): Observable<ISpecification> => {
    return this._http
      .patch<ISpecification>(
        `${this.SPECIFICATION_URL}/${id}`,
        updatedSpecification,
      )
      .pipe(share());
  };

  deleteSpecification$ = (id: number): Observable<ISpecification> => {
    return this._http
      .delete<ISpecification>(`${this.SPECIFICATION_URL}/${id}`)
      .pipe(share());
  };
}
