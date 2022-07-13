import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { NotificationService } from '@modules/settings/services/notification.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-settings-navbar',
  templateUrl: './settings-navbar.component.html',
  styleUrls: ['./settings-navbar.component.scss'],
})
export class SettingsNavbarComponent implements OnInit {
  constructor(private _notificationService: NotificationService) {}

  unreadNotificationCount = 0;
  settingsPath = ROUTER_UTILS.config.settings;

  notification$!: Observable<INotification>;

  ngOnInit(): void {
    this.notification$ = this._notificationService
      .connect()
      .pipe(tap(() => (this.unreadNotificationCount += 1)));
  }
}
