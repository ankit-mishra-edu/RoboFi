import { AbstractControl } from '@angular/forms';

export function isInValid(control: AbstractControl): boolean {
  return control.invalid && control.touched && control.dirty;
}

export function isValid(control: AbstractControl): boolean {
  return control.valid && (control.touched || control.dirty);
}
