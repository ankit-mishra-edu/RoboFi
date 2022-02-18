import { Pipe, PipeTransform } from '@angular/core';
import { SearchBoxService } from '@app/@core/services/search-box/search-box.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterAutomationMicrobot',
})
export class FilterAutomationMicrobotPipe implements PipeTransform {
  constructor(private _searchBoxService: SearchBoxService) {}

  transform(automationMicrobots: IMicrobot[]): Observable<IMicrobot[]> {
    this._searchBoxService.searchBoxTypedKeywords = '';
    return combineLatest([
      of(automationMicrobots),
      this._searchBoxService.searchBoxKeywords$,
    ]).pipe(
      map(([automationMicrobots, searchTerm]) =>
        searchTerm === ''
          ? automationMicrobots
          : automationMicrobots.filter((automationMicrobots: IMicrobot) =>
              automationMicrobots.Name.replaceAll(' ', '')
                .toUpperCase()
                .includes(searchTerm.replaceAll(' ', '').toUpperCase()),
            ),
      ),
    );
  }
}
