import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpeechService } from '@core/services/speech/speech.service';
import { Observable, Subject } from 'rxjs';
import { share, takeUntil, tap } from 'rxjs/operators';
import { SearchBoxStore } from './search-box.store';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  constructor(
    private _speechService: SpeechService,
    private _searchBoxStore: SearchBoxStore,
  ) {}

  destroy$ = new Subject();
  @Input('width') width = 'w-24';

  ngOnInit(): void {
    this._searchBoxStore.listenClicks$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this._speechService.listen()),
        share(),
      )
      .subscribe();
  }

  get placeholder$(): Observable<string> {
    return this._searchBoxStore.placeholder$;
  }

  set searchBoxTypedKeywords(value: string) {
    this._searchBoxStore.searchBoxTypedKeywords = value;
  }

  get searchBoxKeywords$(): Observable<string> {
    return this._searchBoxStore.searchBoxKeywords$;
  }

  get listenClicks$(): Observable<string> {
    return this._searchBoxStore.listenClicks$;
  }

  set listenClicks(value: string) {
    this._searchBoxStore.listenClicks = value;
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
