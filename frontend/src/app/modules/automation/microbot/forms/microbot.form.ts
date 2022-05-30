import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MicrobotForms {
  constructor(private _formBuilder: FormBuilder) {}

  microbotForm!: FormGroup;

  public InitForm(): FormGroup {
    this.microbotForm = this._formBuilder.group({
      Name: [null, [Validators.required]],
      Technology: ['Select Technology', [Validators.required]],
      Description: [null, [Validators.required]],
      Version: [null, []],
      specification: ['Select Specification', Validators.required],
    });
    return this.microbotForm;
  }
}

export class MicrobotFilterForm {
  constructor(private _formBuilder: FormBuilder) {}

  microbotFilterForm!: FormGroup;

  public InitForm(): FormGroup {
    this.microbotFilterForm = this._formBuilder.group({
      filter: ['Name', [Validators.required]],
    });
    return this.microbotFilterForm;
  }
}
