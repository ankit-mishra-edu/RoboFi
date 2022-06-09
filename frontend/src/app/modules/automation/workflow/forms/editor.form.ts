import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class WorkflowEditorForm {
  constructor(private _formBuilder: FormBuilder) {}

  editorForm!: FormGroup;

  public InitForm(): FormGroup {
    this.editorForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      visibility: ['PRIVATE', [Validators.required]],
    });
    return this.editorForm;
  }
}
