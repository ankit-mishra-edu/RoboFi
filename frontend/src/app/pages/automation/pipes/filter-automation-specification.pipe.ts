import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxService } from '@app/@core/services/search-box/search-box.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterAutomationSpecification',
})
export class FilterAutomationSpecificationPipe implements PipeTransform {
  constructor(private _searchBoxService: SearchBoxService) {}

  transform(
    automationSpecifications$: Observable<ISpecification[]>,
  ): Observable<ISpecification[]> {
    this._searchBoxService.searchBoxTypedKeywords = '';
    return combineLatest([
      automationSpecifications$,
      this._searchBoxService.searchBoxKeywords$,
    ]).pipe(
      map(([automationSpecifications, searchTerm]) =>
        automationSpecifications.filter(
          (automationSpecifications: ISpecification) =>
            automationSpecifications.Name.replaceAll(' ', '')
              .toUpperCase()
              .includes(searchTerm.replaceAll(' ', '').toUpperCase()),
        ),
      ),
    );
  }
}
