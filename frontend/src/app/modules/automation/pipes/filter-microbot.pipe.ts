import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxService } from '@core/services/search-box/search-box.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoMicrobotStore } from '../store/microbot/microbot.store';

@Pipe({
  name: 'filterAutomationMicrobot',
})
export class FilterAutomationMicrobotPipe implements PipeTransform {
  constructor(
    private _searchBoxService: SearchBoxService,
    private _autoMicrobotStore: AutoMicrobotStore,
  ) {}

  transform(automationMicrobots: IMicrobot[]): Observable<IMicrobot[]> {
    this._searchBoxService.searchBoxTypedKeywords = '';
    return combineLatest([
      of(automationMicrobots),
      this._searchBoxService.searchBoxKeywords$,
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
