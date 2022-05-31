import { Component, OnInit } from '@angular/core';
// All related to Forms
import { AbstractControl, FormGroup } from '@angular/forms';
import { isInValid, isValid } from '@core/validators';
import { environment } from '@environments/environment';
import { UserDetailsForms } from '@modules/auth/forms/auth.form';
import { AuthService } from '@modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { share, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.page.html',
  styleUrls: ['./edit-details.page.scss'],
})
export class EditDetailsPage implements OnInit {
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;

  isUserConfirmed = false;

  confirmUserForm!: FormGroup;
  editDetailsForm!: FormGroup;

  allUsers$!: Observable<IUser[]>;
  loggedInUser$!: Observable<IUser>;
  userProfile$!: Observable<IProfile>;

  MEDIA_URL = environment.MEDIA_BASE_URL;

  value_c(controlName: string): AbstractControl {
    return this.confirmUserForm.controls[controlName];
  }

  value_e(controlName: string): AbstractControl {
    return this.editDetailsForm.controls[controlName];
  }

  ngOnInit(): void {
    this.loggedInUser$ = this._authService.loggedInUser$;

    this.userProfile$ = this.loggedInUser$.pipe(
      tap((loggedInUser: IUser) => {
        this.confirmUserForm = UserDetailsForms.ConfirmUserForm(loggedInUser);
      }),
      switchMap((loggedInUser: IUser) =>
        this._userService.profileById$(loggedInUser.id),
      ),
      share(),
    );

    this.allUsers$ = this.loggedInUser$.pipe(
      switchMap((loggedInUser: IUser) =>
        this._userService.allUsers$.pipe(
          tap((allUsers: IUser[]) => {
            this.editDetailsForm = UserDetailsForms.EditDetailsForm(
              loggedInUser,
              allUsers,
            );
            this.editDetailsForm.patchValue(loggedInUser);
          }),
        ),
      ),
      share(),
    );
  }

  confirmUser(username: string): void {
    this.value_c('username').setValue(username);
    this._authService.signIn(this.confirmUserForm.value).subscribe(
      () => {
        this.isUserConfirmed = true;
      },

      () => {
        this.isUserConfirmed = false;
      },
    );
  }

  changeUserDetails(): void {
    this._userService.editUserDetails(this.editDetailsForm.value).subscribe();
  }
}
