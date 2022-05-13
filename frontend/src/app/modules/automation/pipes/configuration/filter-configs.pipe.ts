import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxStore } from '@components/search-box/search-box.store';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterConfigs',
})
export class FilterConfigurationsPipe implements PipeTransform {
  constructor(private _searchBoxStore: SearchBoxStore) {}

  transform(
    automationConfiguration: IAutomationConfiguration,
  ): Observable<IAutomationConfigurationEntry[]> {
    this._searchBoxStore.searchBoxTypedKeywords = '';
    return combineLatest([
      of(automationConfiguration),
      this._searchBoxStore.searchBoxKeywords$,
    ]).pipe(
      map(([automationConfiguration, searchTerm]) =>
        searchTerm === ''
          ? automationConfiguration.entries
          : automationConfiguration.entries.filter(
              (configEntry: IAutomationConfigurationEntry) =>
                configEntry.name
                  .replaceAll(' ', '')
                  .toUpperCase()
                  .includes(searchTerm.replaceAll(' ', '').toUpperCase()),
            ),
      ),
    );
  }
}
