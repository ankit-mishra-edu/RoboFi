import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class SpecificationForm {
  constructor(private _formBuilder: FormBuilder) {}

  specificationForm!: FormGroup;

  public InitForm() {
    this.specificationForm = this._formBuilder.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Version: ['', [Validators.required]],

      Inputs: new FormBuilder().array([]),
      Outputs: new FormBuilder().array([]),
      Errors: new FormBuilder().array([]),
      Dependencies: new FormBuilder().array([]),
      Authors: new FormBuilder().array([]),
    });
    return this.specificationForm;
  }

  public initInputRow() {
    return this._formBuilder.group({
      Name: [null, Validators.required],
      Type: [null, Validators.required],
      DefaultValue: [null],
      Description: [null],
    });
  }

  public initOutputRow() {
    return this._formBuilder.group({
      Name: [null, Validators.required],
      Type: [null, Validators.required],
      Description: [null],
    });
  }

  public initErrorRow() {
    return this._formBuilder.group({
      Message: [null, Validators.required],
      Code: [null, Validators.required],
      Description: [null],
    });
  }

  public initDependencyRow() {
    return this._formBuilder.group({
      Name: [null, Validators.required],
      Type: [null, Validators.required],
      Description: [null],
    });
  }

  public initAuthorRow() {
    return this._formBuilder.group({
      Name: [null, Validators.required],
      Email: [null, Validators.required],
      Contact: [null],
    });
  }

  // Input Parameters
  public get inputFormsArr(): FormArray {
    return this.specificationForm.get('Inputs') as FormArray;
  }

  AddSpecificationInput() {
    this.inputFormsArr.push(this.initInputRow());
  }

  DeleteSpecificationInput(index: number) {
    this.inputFormsArr.removeAt(index);
  }

  DeleteAllSpecificationInput() {
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

  AddSpecificationOutput() {
    this.outputFormsArr.push(this.initOutputRow());
  }

  DeleteSpecificationOutput(index: number) {
    this.outputFormsArr.removeAt(index);
  }

  DeleteAllSpecificationOutput() {
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

  AddSpecificationError() {
    this.errorFormsArr.push(this.initErrorRow());
  }

  DeleteSpecificationError(index: number) {
    this.errorFormsArr.removeAt(index);
  }

  DeleteAllSpecificationError() {
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

  AddSpecificationDependency() {
    this.dependencyFormsArr.push(this.initDependencyRow());
  }

  DeleteSpecificationDependency(index: number) {
    this.dependencyFormsArr.removeAt(index);
  }

  DeleteAllSpecificationDependency() {
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

  AddSpecificationAuthor() {
    this.authorFormsArr.push(this.initAuthorRow());
  }

  DeleteSpecificationAuthor(index: number) {
    this.authorFormsArr.removeAt(index);
  }

  DeleteAllSpecificationAuthor() {
    if (this.authorFormsArr.length > 0) {
      while (this.authorFormsArr.length !== 0) {
        this.authorFormsArr.removeAt(0);
      }
    }
  }
}

export class MicrobotForms {
  // public static EditProfileForm(currentUser: IUser): FormGroup {
  //   return new FormBuilder().group({
  //     user: [currentUser?.id],
  //     bio: ['', [Validators.maxLength(150)]],
  //     address: new FormBuilder().group({
  //       user: [currentUser],
  //       city: [''],
  //       state: [''],
  //       street: [''],
  //       zip_code: [''],
  //     }),
  //     birth_date: [null],
  //     email_confirmed: [false],
  //     image: [null],
  //   });
  // }
}
