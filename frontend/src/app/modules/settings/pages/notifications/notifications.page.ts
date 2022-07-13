import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { isInValid, isValid } from '@core/validators';
import { AuthService } from '@modules/auth/services/auth.service';
import { NotificationForm } from '@modules/settings/forms/notification.form';
import { UserService } from '@modules/user/services/user.service';
import { Observable, tap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  constructor(
    private _formBulder: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _notificationService: NotificationService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;
  notificationForm!: FormGroup;
  notifications = [] as INotification[];

  receivers$!: Observable<IUser[]>;
  receivedNotification$!: Observable<INotification>;

  ngOnInit(): void {
    this.receivedNotification$ = this._notificationService
      .connect()
      .pipe(
        tap((notification: INotification) =>
          this.notifications.push(notification),
        ),
      );

    this.notificationForm = new NotificationForm(
      this._formBulder,
      this._authService,
    ).InitForm();

    this.receivers$ = this._userService.allUsers$;
  }

  value(controlName: string): AbstractControl {
    return this.notificationForm.controls[controlName];
  }

  SendNotification(): void {
    this._notificationService.SendNotification(this.notificationForm.value);
    this.notificationForm = new NotificationForm(
      this._formBulder,
      this._authService,
    ).InitForm();
  }
}
