import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchBoxStore } from '@components/search-box/search-box.store';
import { Subject, takeUntil, tap } from 'rxjs';
import { MicrobotFilterForm } from '../../forms/microbot.form';
import { AutoMicrobotStore } from '../../store/microbot.store';

@Component({
  selector: 'app-auto-microbot-filter',
  templateUrl: './auto-microbot-filter.component.html',
  styleUrls: ['./auto-microbot-filter.component.scss'],
})
export class FilterAutoMicrobotComponent implements OnInit, OnDestroy {
  constructor(
    private _formBuilder: FormBuilder,
    private _searchBoxStore: SearchBoxStore,
    private _autoMicrobotStore: AutoMicrobotStore,
  ) {}

  destroy$ = new Subject();

  microbotFilterForm!: FormGroup;
  microbotFilterFormObj!: MicrobotFilterForm;

  ngOnInit(): void {
    this.microbotFilterFormObj = new MicrobotFilterForm(this._formBuilder);
    this.microbotFilterForm = this.microbotFilterFormObj.InitForm();

    this.microbotFilterForm
      .get('filter')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        tap((microbotFilterKey) => {
          this._searchBoxStore.searchBoxTypedKeywords = '';
          this._searchBoxStore.placeholder = `by ${microbotFilterKey}`;
          this._autoMicrobotStore.microbotFilterKey = microbotFilterKey;
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
