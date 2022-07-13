import { Injectable } from '@angular/core';
import { ENDPOINT_UTILS } from '@core/utils';
import { environment } from '@environments/environment';
import { catchError, EMPTY, map, Observable, retry } from 'rxjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  webSocketSubject$!: WebSocketSubject<INotificationResponse>;
  NOTIFICATION_URL = `${environment.WS_BASE_URL}/${ENDPOINT_UTILS.config.settings.root}/${ENDPOINT_UTILS.config.settings.notification}/`;

  /**
   * Returns a WebsocketSubject which reconnects after failure
   */
  private getWebSocket(): WebSocketSubject<INotificationResponse> {
    console.log('[NotificationService] : Establishing Connection');
    this.webSocketSubject$ = webSocket<INotificationResponse>({
      url: this.NOTIFICATION_URL,
      openObserver: {
        next: () => {
          console.log('[NotificationService] : Connection OK');
        },
      },
      closeObserver: {
        next: () => {
          console.log('[NotificationService] : Connection Closed');
          this.connect();
        },
      },
    });
    return this.webSocketSubject$;
  }

  /**
   * Returns a socket instance as observable
   * @param cfg if true connection will be retried
   */
  public connect(
    cfg: { reconnect: boolean } = { reconnect: true },
  ): Observable<INotification> {
    if (!this.webSocketSubject$ || this.webSocketSubject$.closed) {
      this.webSocketSubject$ = this.getWebSocket();
    }

    return this.webSocketSubject$.pipe(
      cfg.reconnect
        ? retry({ delay: environment.WS_RECONNECT_INTERVAL })
        : (observable) => observable,
      map(
        (notificationResponse: INotificationResponse) =>
          notificationResponse.notification,
      ),
      catchError(() => EMPTY),
    );
  }

  /**
   * Sends Notification to the WebSocket
   */
  public SendNotification(notification: INotification): void {
    console.log(
      '[NotificationService] : Sending Notification : ',
      notification,
    );
    const notificationResponse: INotificationResponse = {
      type: 'notify',
      notification: notification,
    };
    this.webSocketSubject$.next(notificationResponse);
  }
}
