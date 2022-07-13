import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class SpecificationForm {
  constructor(private _formBuilder: FormBuilder) {}

  specificationForm!: FormGroup;

  public InitForm(): FormGroup {
    this.specificationForm = this._formBuilder.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Version: ['', [Validators.required]],

      Inputs: this._formBuilder.array([]),
      Outputs: this._formBuilder.array([]),
      Errors: this._formBuilder.array([]),
      Dependencies: this._formBuilder.array([]),
      Authors: this._formBuilder.array([]),
    });
    return this.specificationForm;
  }

  public initInputRow(
    Name?: string,
    Type?: string,
    DefaultValue?: string,
    Description?: string,
  ): FormGroup {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Type: [Type, Validators.required],
      DefaultValue: [DefaultValue],
      Description: [Description],
    });
  }

  public initOutputRow(
    Name?: string,
    Type?: string,
    Description?: string,
  ): FormGroup {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Type: [Type, Validators.required],
      Description: [Description],
    });
  }

  public initErrorRow(
    Message?: string,
    Code?: string,
    Description?: string,
  ): FormGroup {
    return this._formBuilder.group({
      Message: [Message, Validators.required],
      Code: [Code, Validators.required],
      Description: [Description],
    });
  }

  public initDependencyRow(
    Name?: string,
    Type?: string,
    Description?: string,
  ): FormGroup {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Type: [Type, Validators.required],
      Description: [Description],
    });
  }

  public initAuthorRow(
    Name?: string,
    Email?: string,
    Contact?: string,
  ): FormGroup {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Email: [Email, Validators.required],
      Contact: [Contact],
    });
  }

  // Input Parameters
  public get inputFormsArr(): FormArray {
    return this.specificationForm.get('Inputs') as FormArray;
  }

  AddSpecificationInput(...inputs: [string?, string?, string?, string?]): void {
    this.inputFormsArr.push(this.initInputRow(...inputs));
  }

  DeleteSpecificationInput(index: number): void {
    this.inputFormsArr.removeAt(index);
  }

  DeleteAllSpecificationInput(): void {
    if (this.inputFormsArr.length > 0) {
      while (this.inputFormsArr.length !== 0) {
        this.inputFormsArr.removeAt(0);
      }
    }
  }

  // Output Parameters
  public get outputFormsArr(): FormArray {
    return this.specificationForm.get('Outputs') as FormArray;
  }

  AddSpecificationOutput(...outputs: [string?, string?, string?]): void {
    this.outputFormsArr.push(this.initOutputRow(...outputs));
  }

  DeleteSpecificationOutput(index: number): void {
    this.outputFormsArr.removeAt(index);
  }

  DeleteAllSpecificationOutput(): void {
    if (this.outputFormsArr.length > 0) {
      while (this.outputFormsArr.length !== 0) {
        this.outputFormsArr.removeAt(0);
      }
    }
  }

  // Errors
  public get errorFormsArr(): FormArray {
    return this.specificationForm.get('Errors') as FormArray;
  }

  AddSpecificationError(...errors: [string?, string?, string?]): void {
    this.errorFormsArr.push(this.initErrorRow(...errors));
  }

  DeleteSpecificationError(index: number): void {
    this.errorFormsArr.removeAt(index);
  }

  DeleteAllSpecificationError(): void {
    if (this.errorFormsArr.length > 0) {
      while (this.errorFormsArr.length !== 0) {
        this.errorFormsArr.removeAt(0);
      }
    }
  }

  // Dependencies
  public get dependencyFormsArr(): FormArray {
    return this.specificationForm.get('Dependencies') as FormArray;
  }

  AddSpecificationDependency(
    ...dependencies: [string?, string?, string?]
  ): void {
    this.dependencyFormsArr.push(this.initDependencyRow(...dependencies));
  }

  DeleteSpecificationDependency(index: number): void {
    this.dependencyFormsArr.removeAt(index);
  }

  DeleteAllSpecificationDependency(): void {
    if (this.dependencyFormsArr.length > 0) {
      while (this.dependencyFormsArr.length !== 0) {
        this.dependencyFormsArr.removeAt(0);
      }
    }
  }

  // Authors
  public get authorFormsArr(): FormArray {
    return this.specificationForm.get('Authors') as FormArray;
  }

  AddSpecificationAuthor(...authors: [string?, string?, string?]): void {
    this.authorFormsArr.push(this.initAuthorRow(...authors));
  }

  DeleteSpecificationAuthor(index: number): void {
    this.authorFormsArr.removeAt(index);
  }

  DeleteAllSpecificationAuthor(): void {
    if (this.authorFormsArr.length > 0) {
      while (this.authorFormsArr.length !== 0) {
        this.authorFormsArr.removeAt(0);
      }
    }
  }
}

export class SpecificationFilterForm {
  constructor(private _formBuilder: FormBuilder) {}

  specificationFilterForm!: FormGroup;

  public InitForm(): FormGroup {
    this.specificationFilterForm = this._formBuilder.group({
      filter: ['Name', [Validators.required]],
    });
    return this.specificationFilterForm;
  }
}
