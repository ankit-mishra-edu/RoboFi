import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxStore } from '@components/search-box/search-box.store';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoMicrobotStore } from '../store/microbot/microbot.store';

@Pipe({
  name: 'filterMicrobots',
})
export class FilterMicrobotsPipe implements PipeTransform {
  constructor(
    private _searchBoxStore: SearchBoxStore,
    private _autoMicrobotStore: AutoMicrobotStore,
  ) {}

  transform(automationMicrobots: IMicrobot[]): Observable<IMicrobot[]> {
    this._searchBoxStore.searchBoxTypedKeywords = '';
    return combineLatest([
      of(automationMicrobots),
      this._searchBoxStore.searchBoxKeywords$,
      this._autoMicrobotStore.microbotFilterKey$,
    ]).pipe(
      map(([autoMicrobots, searchTerm, microbotFilterKey]) =>
        searchTerm === ''
          ? autoMicrobots
          : autoMicrobots.filter((autoMicrobots: IMicrobot) =>
              autoMicrobots[microbotFilterKey]
                .replaceAll(' ', '')
                .toUpperCase()
                .includes(searchTerm.replaceAll(' ', '').toUpperCase()),
            ),
      ),
    );
  }
}
