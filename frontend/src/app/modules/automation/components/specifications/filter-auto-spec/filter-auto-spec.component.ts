import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecificationFilterForm } from '@modules/automation/forms';
import { AutoSpecificationStore } from '@modules/automation/store/specification/specification.store';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-filter-auto-spec',
  templateUrl: './filter-auto-spec.component.html',
  styleUrls: ['./filter-auto-spec.component.scss'],
})
export class FilterAutoSpecComponent implements OnInit, OnDestroy {
  constructor(
    private _formBuilder: FormBuilder,
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
        tap(
          (specFilterKey) =>
            (this._autoSpecStore.specificationFilterKey = specFilterKey),
        ),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
