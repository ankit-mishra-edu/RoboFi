import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxService } from '@core/services/search-box/search-box.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoSpecificationStore } from '../store/specification/specification.store';

@Pipe({
  name: 'filterAutomationSpecification',
})
export class FilterAutomationSpecificationPipe implements PipeTransform {
  constructor(
    private _searchBoxService: SearchBoxService,
    private _autoSpecStore: AutoSpecificationStore,
  ) {}

  transform(
    automationSpecifications: ISpecification[],
  ): Observable<ISpecification[]> {
    this._searchBoxService.searchBoxTypedKeywords = '';
    return combineLatest([
      of(automationSpecifications),
      this._searchBoxService.searchBoxKeywords$,
      this._autoSpecStore.specificationFilterKey$,
    ]).pipe(
      map(([autoSpecs, searchTerm, specFilterKey]) =>
        searchTerm === ''
          ? autoSpecs
          : autoSpecs.filter((autoSpecs: ISpecification) =>
              autoSpecs[specFilterKey]
                .replaceAll(' ', '')
                .toUpperCase()
                .includes(searchTerm.replaceAll(' ', '').toUpperCase()),
            ),
      ),
    );
  }
}
