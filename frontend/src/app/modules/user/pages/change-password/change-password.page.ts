import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { isInValid, isValid } from '@modules/auth/validators/custom.validator';
import { Subscription } from 'rxjs';
import { UserForms } from '../../forms/change-password.form';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit, OnDestroy {
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;
  loggedInUser!: IUser;

  changePasswordForm!: FormGroup;

  confirmUserSubs!: Subscription;
  changePasswordSubs!: Subscription;

  value(controlName: string): AbstractControl {
    return this.changePasswordForm.controls[controlName];
  }

  ngOnInit(): void {
    this.loggedInUser = this._authService.loggedInUser;

    this.changePasswordForm = UserForms.ChangePasswordForm();
  }

  confirmUser(): void {
    const loginFormData: IUser = <IUser>{
      username: this.loggedInUser.username,
      password: this.value('oldPassword')?.value,
      email: 'amishm7@gmail.com',
    };
    this.confirmUserSubs = this._authService
      .signIn(loginFormData)
      .subscribe(() => {
        this.changePassword();
      });
  }

  changePassword(): void {
    this.changePasswordSubs = this._userService
      .changePassword(this.changePasswordForm.value)
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.changePasswordSubs) {
      this.changePasswordSubs.unsubscribe();
    }
    if (this.confirmUserSubs) {
      this.confirmUserSubs.unsubscribe();
    }
  }
}
