import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import {
  isInValid,
  isValid,
} from '@app/pages/auth/validators/custom.validator';
import { SpecificationForm } from '@app/pages/automation/forms';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './view-or-edit.page.html',
  styleUrls: ['./view-or-edit.page.scss'],
})
export class ViewOrEditConfigurationPage implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _specificationService: SpecificationService,
  ) {}

  mode!: 'edit' | 'view';
  routeParams$!: Observable<Params>;
  specification$!: Observable<ISpecification>;
  specificationPath = ROUTER_UTILS.config.automation.specification;

  isValid = isValid;
  isInValid = isInValid;
  viewOrEditSpecificationForm!: FormGroup;
  viewOrEditSpecificationFormObj!: SpecificationForm;

  ngOnInit() {
    this.routeParams$ = this._route.params;

    this.specification$ = this.routeParams$.pipe(
      tap((routeParams: Params) => (this.mode = routeParams.mode)),
      switchMap((routeParams: Params) =>
        this._specificationService.specificationById$(routeParams.id).pipe(
          tap((specification: ISpecification) => {
            this.viewOrEditSpecificationForm.patchValue(specification);
          }),
        ),
      ),
    );

    this.viewOrEditSpecificationFormObj = new SpecificationForm(
      this._formBuilder,
    );
    this.viewOrEditSpecificationFormObj.InitForm();
    this.viewOrEditSpecificationForm =
      this.viewOrEditSpecificationFormObj.specificationForm;
  }

  UpdateSpecification = (id: number): void => {
    this._specificationService
      .updateSpecification$(id, this.viewOrEditSpecificationForm.value)
      .subscribe(() =>
        this._router.navigate([this.specificationPath.viewAll], {
          relativeTo: this._route.parent,
        }),
      );
  };

  value(controlName: string): AbstractControl {
    return this.viewOrEditSpecificationForm.controls[controlName];
  }

  value_i(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.viewOrEditSpecificationForm.controls['Inputs'].get([index])
    )).controls[controlName];
  }

  value_o(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.viewOrEditSpecificationForm.controls['Outputs'].get([index])
    )).controls[controlName];
  }

  value_e(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.viewOrEditSpecificationForm.controls['Errors'].get([index])
    )).controls[controlName];
  }

  value_d(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.viewOrEditSpecificationForm.controls['Dependencies'].get([index])
    )).controls[controlName];
  }

  value_a(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.viewOrEditSpecificationForm.controls['Authors'].get([index])
    )).controls[controlName];
  }

  ngOnDestroy() {}
}
