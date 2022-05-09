import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MicrobotFilterForm } from '@modules/automation/forms';
import { AutoMicrobotStore } from '@modules/automation/store/microbot/microbot.store';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-auto-microbot-filter',
  templateUrl: './auto-microbot-filter.component.html',
  styleUrls: ['./auto-microbot-filter.component.scss'],
})
export class FilterAutoMicrobotComponent implements OnInit, OnDestroy {
  constructor(
    private _formBuilder: FormBuilder,
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
        tap(console.log),
        tap(
          (microbotFilterKey) =>
            (this._autoMicrobotStore.microbotFilterKey = microbotFilterKey),
        ),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
