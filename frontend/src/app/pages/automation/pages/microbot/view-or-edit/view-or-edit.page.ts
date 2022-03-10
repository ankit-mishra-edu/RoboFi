import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import {
  isInValid,
  isValid,
} from '@app/pages/auth/validators/custom.validator';
import { MicrobotForms } from '@app/pages/automation/forms';
import { MicrobotService } from '@app/pages/automation/services/microbot.service';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import { iif, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

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
    private _specificationService: SpecificationService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;

  destroy$ = new Subject();
  MICROBOT_PATH = ROUTER_UTILS.config.automation.microbot;

  viewOrEditMicrobotFormObj!: MicrobotForms;
  viewOrEditMicrobotForm!: FormGroup;

  mode!: 'view' | 'edit';
  microbot$!: Observable<IMicrobot>;
  specification$!: Observable<ISpecification>;
  specifications$!: Observable<ISpecification[]>;

  ngOnInit(): void {
    this.specifications$ = this._specificationService.getSpecifications$();

    this.viewOrEditMicrobotFormObj = new MicrobotForms(this._formBuilder);
    this.viewOrEditMicrobotForm = this.viewOrEditMicrobotFormObj.InitForm();

    this.microbot$ = this._route.params.pipe(
      tap((routeParams: Params) => (this.mode = routeParams.mode)),
      switchMap((routeParams: Params) =>
        this._microbotService.microbot$.pipe(
          switchMap((microbot: IMicrobot) =>
            iif(
              () => microbot.id != undefined,
              this._microbotService.microbot$,
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

    this.specification$ = this.value('specification').valueChanges.pipe(
      startWith({}),
      switchMap((selectedSpecificationId: any) =>
        typeof selectedSpecificationId === 'object'
          ? of({} as ISpecification)
          : this._specificationService
              .specificationById$(selectedSpecificationId)
              .pipe(catchError(() => of({} as ISpecification))),
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
