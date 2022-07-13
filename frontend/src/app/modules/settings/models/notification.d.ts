interface INotification {
  sender: IUser;
  reciever: IUser;
  content: string;
}

interface INotificationResponse {
  type: string;
  notification: INotification;
}
