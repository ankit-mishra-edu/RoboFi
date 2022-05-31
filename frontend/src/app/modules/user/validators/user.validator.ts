import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function validateNotExists(allUsers: IUser[]): ValidatorFn {
  return (
    control: AbstractControl,
  ): Observable<{ [key: string]: boolean } | null> => {
    let validationStatus = false;
    const controls = control.parent?.controls || {};
    const controlName =
      Object.keys(controls).find(
        (key) => control === control.parent?.get(key),
      ) || '';
    if (allUsers) {
      for (const user of allUsers) {
        const userValue =
          Object.values(user)[Object.keys(user).indexOf(controlName)];
        if (userValue == control.value) {
          validationStatus = true;
          break;
        }
      }
    } else {
      console.log('No Data passed');
    }
    return of(validationStatus ? { alreadyTakenError: true } : null);
  };
}

export function validateNotTakenByOthers(
  currentUser: IUser,
  allUsers: IUser[],
): ValidatorFn {
  return (
    control: AbstractControl,
  ): Observable<{ [key: string]: boolean } | null> => {
    let validationStatus = false;
    const controls = control.parent?.controls || {};
    const controlName =
      Object.keys(controls).find(
        (key) => control === control.parent?.get(key),
      ) || '';
    if (allUsers) {
      for (const user of allUsers) {
        const userValue =
          Object.values(user)[Object.keys(user).indexOf(controlName)];
        const currentUserValue =
          Object.values(currentUser)[
            Object.keys(currentUser).indexOf(controlName)
          ];
        if (userValue == control.value && userValue != currentUserValue) {
          validationStatus = true;
          break;
        }
      }
    } else {
      console.log('No Data passed');
    }
    return of(validationStatus ? { alreadyTakenError: true } : null);
  };
}
