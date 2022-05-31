import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { isInValid, isValid } from '@core/validators';
import { SpecificationForm } from '../../forms/specification.form';
import { SpecificationService } from '../../services/specification.service';

@Component({
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreateSpecificationPage implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _specificationService: SpecificationService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;
  createSpecificationForm!: FormGroup;
  createSpecificationFormObj!: SpecificationForm;
  specificationPath = ROUTER_UTILS.config.automation.specification;

  ngOnInit(): void {
    this.createSpecificationFormObj = new SpecificationForm(this._formBuilder);
    this.createSpecificationFormObj.InitForm();
    this.createSpecificationForm =
      this.createSpecificationFormObj.specificationForm;
  }

  CreateSpecification(): void {
    console.log(this.createSpecificationForm.value);
    this._specificationService
      .CreateSpecification$(this.createSpecificationForm.value)
      .subscribe(() =>
        this._router.navigate([this.specificationPath.viewAll], {
          relativeTo: this._route.parent,
        }),
      );
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

  // Input Parameters
  get inputFormsArr(): FormArray {
    return this.createSpecificationFormObj.inputFormsArr;
  }

  AddSpecificationInput(): void {
    this.createSpecificationFormObj.AddSpecificationInput();
  }

  DeleteSpecificationInput(index: number): void {
    this.createSpecificationFormObj.DeleteSpecificationInput(index);
  }

  DeleteAllSpecificationInput(): void {
    this.createSpecificationFormObj.DeleteAllSpecificationInput();
  }

  // Output Parameters
  get outputFormsArr(): FormArray {
    return this.createSpecificationFormObj.outputFormsArr;
  }

  AddSpecificationOutput(): void {
    this.createSpecificationFormObj.AddSpecificationOutput();
  }

  DeleteSpecificationOutput(index: number): void {
    this.createSpecificationFormObj.DeleteSpecificationOutput(index);
  }

  DeleteAllSpecificationOutput(): void {
    this.createSpecificationFormObj.DeleteAllSpecificationOutput();
  }

  // Error
  get errorFormsArr(): FormArray {
    return this.createSpecificationFormObj.errorFormsArr;
  }

  AddSpecificationError(): void {
    this.createSpecificationFormObj.AddSpecificationError();
  }

  DeleteSpecificationError(index: number): void {
    this.createSpecificationFormObj.DeleteSpecificationError(index);
  }

  DeleteAllSpecificationError(): void {
    this.createSpecificationFormObj.DeleteAllSpecificationError();
  }

  // Dependencies
  get dependencyFormsArr(): FormArray {
    return this.createSpecificationFormObj.dependencyFormsArr;
  }

  AddSpecificationDependency(): void {
    this.createSpecificationFormObj.AddSpecificationDependency();
  }

  DeleteSpecificationDependency(index: number): void {
    this.createSpecificationFormObj.DeleteSpecificationDependency(index);
  }

  DeleteAllSpecificationDependency(): void {
    this.createSpecificationFormObj.DeleteAllSpecificationDependency();
  }

  // Authors
  get authorFormsArr(): FormArray {
    return this.createSpecificationFormObj.authorFormsArr;
  }

  AddSpecificationAuthor(): void {
    this.createSpecificationFormObj.AddSpecificationAuthor();
  }

  DeleteSpecificationAuthor(index: number): void {
    this.createSpecificationFormObj.DeleteSpecificationAuthor(index);
  }

  DeleteAllSpecificationAuthor(): void {
    this.createSpecificationFormObj.DeleteAllSpecificationAuthor();
  }
}
