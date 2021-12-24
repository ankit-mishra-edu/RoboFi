import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { CreateSpecificationForm } from '@app/pages/automation/forms';
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
  createSpecificationFormObj!: CreateSpecificationForm;
  specificationPath = ROUTER_UTILS.config.automation.specification;

  ngOnInit() {
    this.createSpecificationFormObj = new CreateSpecificationForm(
      this._formBuilder,
    );
    this.createSpecificationFormObj.InitForm();
    this.createSpecificationForm =
      this.createSpecificationFormObj.createSpecificationForm;
  }

  value(controlName: string): AbstractControl {
    return this.createSpecificationForm.controls[controlName];
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

  AddSpecificationInput(...inputs: [string, string, string, string]) {
    this.createSpecificationFormObj.AddSpecificationInput(...inputs);
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

  AddSpecificationOutput(...outputs: [string, string, string]) {
    this.createSpecificationFormObj.AddSpecificationOutput(...outputs);
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

  AddSpecificationError(...errors: [string, string, string]) {
    this.createSpecificationFormObj.AddSpecificationError(...errors);
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

  AddSpecificationDependency(...dependencies: [string, string, string]) {
    this.createSpecificationFormObj.AddSpecificationDependency(...dependencies);
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

  AddSpecificationAuthor(...authors: [string, string, string]) {
    this.createSpecificationFormObj.AddSpecificationAuthor(...authors);
  }

  DeleteSpecificationAuthor(index: number) {
    this.createSpecificationFormObj.DeleteSpecificationAuthor(index);
  }

  DeleteAllSpecificationAuthor() {
    this.createSpecificationFormObj.DeleteAllSpecificationAuthor();
  }
}
