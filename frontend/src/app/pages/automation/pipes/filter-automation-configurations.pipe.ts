import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxService } from '@app/@core/services/search-box/search-box.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterAutomationConfigurations',
})
export class FilterAutomationConfigurationsPipe implements PipeTransform {
  constructor(private _searchBoxService: SearchBoxService) {}

  transform(
    automationConfiguration$: Observable<IAutomationConfiguration>,
  ): Observable<IAutomationConfigurationEntry[]> {
    this._searchBoxService.searchBoxTypedKeywords = '';
    return combineLatest([
      automationConfiguration$,
      this._searchBoxService.searchBoxKeywords$,
    ]).pipe(
      map(([automationConfiguration, searchTerm]) =>
        automationConfiguration.entries.filter(
          (configEntry: IAutomationConfigurationEntry) =>
            configEntry.name.toUpperCase().includes(searchTerm.toUpperCase()),
        ),
      ),
    );
  }
}
