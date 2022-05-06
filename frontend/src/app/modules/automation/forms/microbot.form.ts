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
