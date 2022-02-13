import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ConfigurationForm {
  constructor(private _formBuilder: FormBuilder) {}

  configurationForm!: FormGroup;

  public InitForm(): FormGroup {
    this.configurationForm = this._formBuilder.group({
      id: [null, [Validators.required]],
      user: [null, [Validators.required]],
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
    return this.configurationForm;
  }
}
