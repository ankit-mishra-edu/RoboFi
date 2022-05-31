import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { isInValid, isValid } from '@core/validators';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SpecificationService } from '../../../specification/services/specification.service';
import { MicrobotForms } from '../../forms/microbot.form';
import { MicrobotService } from '../../services/microbot.service';

@Component({
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreateMicrobotPage implements OnInit, OnDestroy {
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

  createMicrobotForm!: FormGroup;
  createMicrobotFormObj!: MicrobotForms;

  specification$!: Observable<ISpecification>;
  specifications$!: Observable<ISpecification[]>;

  MICROBOT_PATH = ROUTER_UTILS.config.automation.microbot;

  ngOnInit(): void {
    this.specifications$ = this._specificationService.getSpecifications$();

    this.createMicrobotFormObj = new MicrobotForms(this._formBuilder);
    this.createMicrobotForm = this.createMicrobotFormObj.InitForm();

    this.specification$ = this.value('specification').valueChanges.pipe(
      takeUntil(this.destroy$),
      filter(
        (selectedSpecificationId: any) =>
          selectedSpecificationId != 'Select Specification',
      ),
      switchMap((selectedSpecificationId: number) =>
        this._specificationService
          .specificationById$(selectedSpecificationId)
          .pipe(catchError(() => of({} as ISpecification))),
      ),
    );
  }

  CreateMicrobot(): void {
    this._microbotService
      .createMicrobot$(this.createMicrobotForm.value)
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
    return this.createMicrobotForm.controls[controlName];
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
