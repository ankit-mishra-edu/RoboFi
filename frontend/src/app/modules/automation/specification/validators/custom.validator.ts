import { AbstractControl, Validators } from '@angular/forms';

export function isInValid(control: AbstractControl): boolean {
  return control.invalid && control.touched && control.dirty;
}

export function isValid(control: AbstractControl): boolean {
  return control.hasValidator(Validators.required)
    ? control.valid && (control.touched || control.dirty)
    : control.valid;
  return control.valid && (control.touched || control.dirty);
}
