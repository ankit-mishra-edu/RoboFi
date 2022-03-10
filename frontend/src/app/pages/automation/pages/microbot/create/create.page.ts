import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { MicrobotForms } from '@app/pages/automation/forms';
import { MicrobotService } from '@app/pages/automation/services/microbot.service';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import {
  isInValid,
  isValid,
} from '@app/pages/automation/validators/custom.validator';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

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
  MICROBOT_PATH = ROUTER_UTILS.config.automation.microbot;

  createMicrobotFormObj!: MicrobotForms;
  createMicrobotForm!: FormGroup;

  specification$!: Observable<ISpecification>;
  specifications$!: Observable<ISpecification[]>;

  ngOnInit(): void {
    this.specifications$ = this._specificationService.getSpecifications$();

    this.createMicrobotFormObj = new MicrobotForms(this._formBuilder);
    this.createMicrobotForm = this.createMicrobotFormObj.InitForm();

    this.specification$ = this.value('specification').valueChanges.pipe(
      takeUntil(this.destroy$),
      filter((selectedSpecificationId: any) => selectedSpecificationId != ''),
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
