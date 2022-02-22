import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ConfigurationEntryForm {
  constructor(private _formBuilder: FormBuilder) {}

  configEntryForm!: FormGroup;

  public InitForm(): FormGroup {
    this.configEntryForm = this._formBuilder.group({
      id: [null, [Validators.required]],
      user: [null, [Validators.required]],
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
    return this.configEntryForm;
  }
}

export class ConfigurationForm {
  constructor(private _formBuilder: FormBuilder) {}

  configurationForm!: FormGroup;

  public InitForm(): FormGroup {
    this.configurationForm = this._formBuilder.group({
      id: [null, [Validators.required]],
      user: [null, [Validators.required]],
      entries: this._formBuilder.array([]),
    });
    return this.configurationForm;
  }

  public InitConfigEntryForm(
    configEntry: IAutomationConfigurationEntry,
  ): FormGroup {
    return this._formBuilder.group({
      id: [configEntry.id, [Validators.required]],
      user: [configEntry.user, [Validators.required]],
      name: [configEntry.name, [Validators.required]],
      value: [configEntry.value, [Validators.required]],
    });
  }

  public get configEntryFormsArr(): FormArray {
    return this.configurationForm.get('entries') as FormArray;
  }

  AddConfigEntry(configEntry: IAutomationConfigurationEntry) {
    this.configEntryFormsArr.push(this.InitConfigEntryForm(configEntry));
  }
}
