import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchBoxStore } from '@components/search-box/search-box.store';
import { Subject, takeUntil, tap } from 'rxjs';
import { SpecificationFilterForm } from '../../forms/specification.form';
import { AutoSpecificationStore } from '../../store/specification.store';

@Component({
  selector: 'app-auto-spec-filter',
  templateUrl: './auto-spec-filter.component.html',
  styleUrls: ['./auto-spec-filter.component.scss'],
})
export class AutoSpecFilterComponent implements OnInit, OnDestroy {
  constructor(
    private _formBuilder: FormBuilder,
    private _searchBoxStore: SearchBoxStore,
    private _autoSpecStore: AutoSpecificationStore,
  ) {}

  destroy$ = new Subject();

  specFilterForm!: FormGroup;
  specFilterFormObj!: SpecificationFilterForm;

  ngOnInit(): void {
    this.specFilterFormObj = new SpecificationFilterForm(this._formBuilder);
    this.specFilterForm = this.specFilterFormObj.InitForm();

    this.specFilterForm
      .get('filter')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        tap((specFilterKey) => {
          this._searchBoxStore.searchBoxTypedKeywords = '';
          this._searchBoxStore.placeholder = `by ${specFilterKey}`;
          this._autoSpecStore.specificationFilterKey = specFilterKey;
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
