import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { NotificationForm } from '@modules/settings/forms/notification.form';
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
    private _notificationService: NotificationService,
  ) {}

  notificationForm!: FormGroup;
  notifications = [] as INotification[];
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
  }

  SendNotification(): void {
    this._notificationService.SendNotification(this.notificationForm.value);
    this.notificationForm = new NotificationForm(
      this._formBulder,
      this._authService,
    ).InitForm();
  }
}
