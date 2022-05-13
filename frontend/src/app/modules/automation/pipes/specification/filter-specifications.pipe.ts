import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxStore } from '@components/search-box/search-box.store';
import { AutoSpecificationStore } from '@modules/automation/store/specification/specification.store';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterSpecifications',
})
export class FilterSpecificationsPipe implements PipeTransform {
  constructor(
    private _searchBoxStore: SearchBoxStore,
    private _autoSpecStore: AutoSpecificationStore,
  ) {}

  transform(
    automationSpecifications: ISpecification[],
  ): Observable<ISpecification[]> {
    this._searchBoxStore.searchBoxTypedKeywords = '';
    return combineLatest([
      of(automationSpecifications),
      this._searchBoxStore.searchBoxKeywords$,
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
