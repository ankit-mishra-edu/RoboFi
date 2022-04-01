import { Component, OnInit } from '@angular/core';
import { SearchBoxService } from '@core/services/search-box/search-box.service';
import { SpeechService } from '@core/services/search-box/speech.service';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  constructor(
    private _searchBoxService: SearchBoxService,
    private _speechService: SpeechService,
  ) {}

  ngOnInit(): void {
    this._searchBoxService.listenClicks$
      .pipe(
        tap(() => this._speechService.listen()),
        share(),
      )
      .subscribe();
  }

  get placeholder$(): Observable<string> {
    return this._searchBoxService.placeholder$;
  }

  set searchBoxTypedKeywords(value: string) {
    this._searchBoxService.searchBoxTypedKeywords = value;
  }

  get searchBoxKeywords$(): Observable<string> {
    return this._searchBoxService.searchBoxKeywords$;
  }

  get listenClicks$(): Observable<string> {
    return this._searchBoxService.listenClicks$;
  }

  set listenClicks(value: string) {
    this._searchBoxService.listenClicks = value;
  }
}
