import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class CreateSpecificationForm {
  constructor(private _formBuilder: FormBuilder) {}

  createSpecificationForm!: FormGroup;

  public InitForm() {
    this.createSpecificationForm = this._formBuilder.group({
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
    return this.createSpecificationForm;
  }

  public initInputRow(
    Name: string,
    Type: string,
    DefaultValue: string,
    Description: string,
  ) {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Type: [Type, Validators.required],
      DefaultValue: [DefaultValue],
      Description: [Description],
    });
  }

  public initOutputRow(Name: string, Type: string, Description: string) {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Type: [Type, Validators.required],
      Description: [Description],
    });
  }

  public initErrorRow(Message: string, Code: string, Description: string) {
    return this._formBuilder.group({
      Message: [Message, Validators.required],
      Code: [Code, Validators.required],
      Description: [Description],
    });
  }

  public initDependencyRow(Name: string, Type: string, Description: string) {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Type: [Type, Validators.required],
      Description: [Description],
    });
  }

  public initAuthorRow(Name: string, Email: string, Contact: string) {
    return this._formBuilder.group({
      Name: [Name, Validators.required],
      Email: [Email, Validators.required],
      Contact: [Contact],
    });
  }

  // Input Parameters
  public get inputFormsArr(): FormArray {
    return this.createSpecificationForm.get('Inputs') as FormArray;
  }

  AddSpecificationInput(...inputs: [string, string, string, string]) {
    this.inputFormsArr.push(this.initInputRow(...inputs));
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
    return this.createSpecificationForm.get('Outputs') as FormArray;
  }

  AddSpecificationOutput(...outputs: [string, string, string]) {
    this.outputFormsArr.push(this.initOutputRow(...outputs));
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
    return this.createSpecificationForm.get('Errors') as FormArray;
  }

  AddSpecificationError(...errors: [string, string, string]) {
    this.errorFormsArr.push(this.initErrorRow(...errors));
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
    return this.createSpecificationForm.get('Dependencies') as FormArray;
  }

  AddSpecificationDependency(...dependencies: [string, string, string]) {
    this.dependencyFormsArr.push(this.initDependencyRow(...dependencies));
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
    return this.createSpecificationForm.get('Authors') as FormArray;
  }

  AddSpecificationAuthor(...authors: [string, string, string]) {
    this.authorFormsArr.push(this.initAuthorRow(...authors));
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
