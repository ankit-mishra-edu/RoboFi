import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxService } from '@core/services/search-box/search-box.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterAutomationSpecification',
})
export class FilterAutomationSpecificationPipe implements PipeTransform {
  constructor(private _searchBoxService: SearchBoxService) {}

  transform(
    automationSpecifications: ISpecification[],
  ): Observable<ISpecification[]> {
    this._searchBoxService.searchBoxTypedKeywords = '';
    return combineLatest([
      of(automationSpecifications),
      this._searchBoxService.searchBoxKeywords$,
    ]).pipe(
      map(([automationSpecifications, searchTerm]) =>
        searchTerm === ''
          ? automationSpecifications
          : automationSpecifications.filter(
              (automationSpecifications: ISpecification) =>
                automationSpecifications.Name.replaceAll(' ', '')
                  .toUpperCase()
                  .includes(searchTerm.replaceAll(' ', '').toUpperCase()),
            ),
      ),
    );
  }
}
