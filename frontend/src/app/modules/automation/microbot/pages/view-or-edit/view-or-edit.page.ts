import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { isInValid, isValid } from '@core/validators';
import { combineLatest, iif, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SpecificationService } from '../../../specification/services/specification.service';
import { MicrobotForms } from '../../forms/microbot.form';
import { MicrobotService } from '../../services/microbot.service';
import { AutoMicrobotStore } from '../../store/microbot.store';

@Component({
  templateUrl: './view-or-edit.page.html',
  styleUrls: ['./view-or-edit.page.scss'],
})
export class ViewOrEditMicrobotPage implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _microbotService: MicrobotService,
    private _autoMicrobotStore: AutoMicrobotStore,
    private _specificationService: SpecificationService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;

  destroy$ = new Subject();

  viewOrEditMicrobotForm!: FormGroup;
  viewOrEditMicrobotFormObj!: MicrobotForms;

  mode!: 'view' | 'edit';
  microbot$!: Observable<IMicrobot>;
  specification$!: Observable<ISpecification>;
  specifications$!: Observable<ISpecification[]>;

  MICROBOT_PATH = ROUTER_UTILS.config.automation.microbot;

  ngOnInit(): void {
    this.specifications$ = this._specificationService.getSpecifications$();

    this.viewOrEditMicrobotFormObj = new MicrobotForms(this._formBuilder);
    this.viewOrEditMicrobotForm = this.viewOrEditMicrobotFormObj.InitForm();

    this.microbot$ = this._route.params.pipe(
      tap((routeParams: Params) => (this.mode = routeParams.mode)),
      switchMap((routeParams: Params) =>
        this._autoMicrobotStore.microbot$.pipe(
          switchMap((microbot: IMicrobot) =>
            iif(
              () => microbot.id != undefined,
              this._autoMicrobotStore.microbot$,
              this._microbotService.microbotById$(routeParams.id),
            ).pipe(
              tap((microbot: IMicrobot) => {
                this.viewOrEditMicrobotForm.patchValue(microbot);
                this.value('specification').setValue(microbot.specification.id);
              }),
            ),
          ),
        ),
      ),
    );

    this.specification$ = combineLatest([
      this.microbot$,
      this.value('specification').valueChanges,
    ]).pipe(
      switchMap(([microbot, selectedSpecificationId]: [IMicrobot, number]) =>
        this._specificationService
          .specificationById$(selectedSpecificationId)
          .pipe(catchError(() => of(microbot.specification))),
      ),
    );
  }

  UpdateMicrobot(id: number): void {
    this._microbotService
      .updateMicrobot$(id, this.viewOrEditMicrobotForm.value)
      .pipe(
        takeUntil(this.destroy$),
        tap(() =>
          this._router.navigate([this.MICROBOT_PATH.viewAll], {
            relativeTo: this._route.parent,
          }),
        ),
      )
      .subscribe();
  }

  value(controlName: string): AbstractControl {
    return this.viewOrEditMicrobotForm.controls[controlName];
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
