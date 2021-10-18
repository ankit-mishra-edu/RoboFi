import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  patternValidator,
  validateNotExists,
  validateNotTakenByOthers,
} from '../validators/custom.validator';

export class AuthenticationForms {
  allUsersArray!: IUser[];

  public static LoginForm(): FormGroup {
    return new FormBuilder().group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: 'amishm766@gmail.com',
    });
  }

  public static SignUpForm(allUsers: IUser[]): FormGroup {
    return new FormBuilder().group({
      id: [''],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
        validateNotExists(allUsers).bind(this),
      ],
      first_name: [''],
      last_name: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$',
          ),
        ],
        validateNotExists(allUsers).bind(this),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}',
          ),
          patternValidator(/\d/, { hasNumber: true }),
          patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          patternValidator(/[a-z]/, { hasSmallCase: true }),
        ],
      ],
    });
  }
}

export class UserDetailsForms {
  public static ConfirmUserForm(currentUser: IUser) {
    return new FormBuilder().group({
      username: [currentUser.username],
      password: ['', [Validators.required]],
      email: 'amishm766@gmail.com',
    });
  }

  public static EditDetailsForm(currentUser: IUser, allUsers: IUser[]) {
    return new FormBuilder().group({
      id: [{ value: null, disabled: false }],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
        validateNotTakenByOthers(currentUser, allUsers).bind(this),
      ],
      first_name: [''],
      last_name: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$',
          ),
        ],
        validateNotTakenByOthers(currentUser, allUsers).bind(this),
      ],
    });
  }

  public static EditProfileForm(currentUser: IUser) {
    return new FormBuilder().group({
      user: [currentUser?.id],
      bio: ['', [Validators.maxLength(150)]],
      address: new FormBuilder().group({
        user: [currentUser],
        city: [''],
        state: [''],
        street: [''],
        zip_code: [''],
      }),
      birth_date: [null],
      email_confirmed: [false],
      image: [null],
    });
  }
}
