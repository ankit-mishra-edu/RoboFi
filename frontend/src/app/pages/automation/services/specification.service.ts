import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@app/@core/utils/endpoints';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpecificationService {
  constructor(private _http: HttpClient) {}

  SPECIFICATION_URL = `/${ENDPOINT_UTILS.config.base.home}/${ENDPOINT_UTILS.config.automation.root}/`;

  allSpecifications$: Observable<ISpecification[]> = this._http
    .get<ISpecification[]>(
      this.SPECIFICATION_URL +
        `${ENDPOINT_UTILS.config.automation.specification}`,
    )
    .pipe(share());

  CreateSpecification$ = (
    specification: ISpecification,
  ): Observable<ISpecification> => {
    return this._http
      .post<ISpecification>(
        this.SPECIFICATION_URL +
          `${ENDPOINT_UTILS.config.automation.specification}`,
        specification,
      )
      .pipe(share());
  };
}
