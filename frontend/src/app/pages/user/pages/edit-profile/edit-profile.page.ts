import { Component, OnDestroy, OnInit } from '@angular/core';
// All related to Forms
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import {
  isInValid,
  isValid,
} from '@app/pages/auth/validators/custom.validator';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserForms } from '../../forms/change-password.form';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _authService: AuthService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;
  loggedInUser!: IUser;

  editProfileForm!: FormGroup;
  userProfile$!: Observable<IProfile>;

  editProfileSubs!: Subscription;

  value(controlName: string): AbstractControl {
    return this.editProfileForm.controls[controlName];
  }

  ngOnInit(): void {
    this.userProfile$ = this._authService.loggedInUser$.pipe(
      switchMap((loggedInUser: IUser) =>
        this._userService.profileById$(loggedInUser.id),
      ),
      tap((userProfile: IProfile) => {
        this.editProfileForm = UserForms.EditProfileForm(this.loggedInUser);
        userProfile ? delete userProfile.image : {};
        this.editProfileForm.patchValue(userProfile);
      }),
    );
  }

  editProfile(): void {
    this.editProfileForm.removeControl('image');
    this.editProfileSubs = this._userService
      .editProfile$(this.editProfileForm.value)
      .subscribe();
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      this.editProfileSubs = this._userService
        .uploadProfilePhoto$(formData)
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.editProfileSubs) {
      this.editProfileSubs.unsubscribe();
    }
  }
}
