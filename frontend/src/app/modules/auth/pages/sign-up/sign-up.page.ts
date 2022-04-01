import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@modules/user/services/user.service';
import { Observable, Subscription, timer } from 'rxjs';
import { share, switchMap, tap } from 'rxjs/operators';
import { AuthenticationForms } from '../../forms/auth.form';
import { AuthService } from '../../services/auth.service';
import { isInValid, isValid } from '../../validators/custom.validator';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;

  allUsers$!: Observable<IUser[]>;

  signUpForm!: FormGroup;
  signUpSubs!: Subscription;

  value(controlName: string): AbstractControl {
    return this.signUpForm.controls[controlName];
  }

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this.allUsers$ = timer(0, 10000).pipe(
      switchMap(() => this._userService.allUsers$),
      tap((allUsers: IUser[]) => {
        if (!this.signUpForm) {
          this.signUpForm = AuthenticationForms.SignUpForm(allUsers);
        }
      }),
      share(),
    );
  }

  signUp(): void {
    this.signUpSubs = this._authService
      .signUp(this.signUpForm.value)
      .subscribe((signUpResponse) => {
        alert(
          'Hit the link sent to ' +
            signUpResponse.user.email +
            ' to activate acount',
        );

        this._router.navigate(['/auth']);
      });
  }

  ngOnDestroy(): void {
    if (this.signUpSubs) {
      this.signUpSubs.unsubscribe();
    }
  }
}
