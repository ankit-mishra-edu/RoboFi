import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { SpecificationForm } from '@app/pages/automation/forms';
import { SpecificationService } from '@app/pages/automation/services/specification.service';
import { isInValid, isValid } from '../../../validators/custom.validator';

@Component({
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreateSpecificationPage implements OnInit {
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _specificationService: SpecificationService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;
  createSpecificationForm!: FormGroup;
  createSpecificationFormObj!: SpecificationForm;
  specificationPath = ROUTER_UTILS.config.automation.specification;

  ngOnInit() {
    this.createSpecificationFormObj = new SpecificationForm(this._formBuilder);
    this.createSpecificationFormObj.InitForm();
    this.createSpecificationForm =
      this.createSpecificationFormObj.specificationForm;
  }

  value(controlName: string): AbstractControl {
    return this.createSpecificationForm.controls[controlName];
  }

  value_i(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.createSpecificationForm.controls['Inputs'].get([index])
    )).controls[controlName];
  }

  value_o(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.createSpecificationForm.controls['Outputs'].get([index])
    )).controls[controlName];
  }

  value_e(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.createSpecificationForm.controls['Errors'].get([index])
    )).controls[controlName];
  }

  value_d(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.createSpecificationForm.controls['Dependencies'].get([index])
    )).controls[controlName];
  }

  value_a(index: number, controlName: string): AbstractControl {
    return (<FormGroup>(
      this.createSpecificationForm.controls['Authors'].get([index])
    )).controls[controlName];
  }

  CreateSpecification() {
    console.log(this.createSpecificationForm.value);
    this._specificationService
      .CreateSpecification$(this.createSpecificationForm.value)
      .subscribe((createSpecificationResponse: ISpecification) =>
        this._router.navigate(['../', this.specificationPath.viewAll]),
      );
  }

  // Input Parameters
  get inputFormsArr() {
    return this.createSpecificationFormObj.inputFormsArr;
  }

  AddSpecificationInput() {
    this.createSpecificationFormObj.AddSpecificationInput();
  }

  DeleteSpecificationInput(index: number) {
    this.createSpecificationFormObj.DeleteSpecificationInput(index);
  }

  DeleteAllSpecificationInput() {
    this.createSpecificationFormObj.DeleteAllSpecificationInput();
  }

  // Output Parameters
  get outputFormsArr() {
    return this.createSpecificationFormObj.outputFormsArr;
  }

  AddSpecificationOutput() {
    this.createSpecificationFormObj.AddSpecificationOutput();
  }

  DeleteSpecificationOutput(index: number) {
    this.createSpecificationFormObj.DeleteSpecificationOutput(index);
  }

  DeleteAllSpecificationOutput() {
    this.createSpecificationFormObj.DeleteAllSpecificationOutput();
  }

  // Error
  get errorFormsArr() {
    return this.createSpecificationFormObj.errorFormsArr;
  }

  AddSpecificationError() {
    this.createSpecificationFormObj.AddSpecificationError();
  }

  DeleteSpecificationError(index: number) {
    this.createSpecificationFormObj.DeleteSpecificationError(index);
  }

  DeleteAllSpecificationError() {
    this.createSpecificationFormObj.DeleteAllSpecificationError();
  }

  // Dependencies
  get dependencyFormsArr() {
    return this.createSpecificationFormObj.dependencyFormsArr;
  }

  AddSpecificationDependency() {
    this.createSpecificationFormObj.AddSpecificationDependency();
  }

  DeleteSpecificationDependency(index: number) {
    this.createSpecificationFormObj.DeleteSpecificationDependency(index);
  }

  DeleteAllSpecificationDependency() {
    this.createSpecificationFormObj.DeleteAllSpecificationDependency();
  }

  // Authors
  get authorFormsArr() {
    return this.createSpecificationFormObj.authorFormsArr;
  }

  AddSpecificationAuthor() {
    this.createSpecificationFormObj.AddSpecificationAuthor();
  }

  DeleteSpecificationAuthor(index: number) {
    this.createSpecificationFormObj.DeleteSpecificationAuthor(index);
  }

  DeleteAllSpecificationAuthor() {
    this.createSpecificationFormObj.DeleteAllSpecificationAuthor();
  }
}
