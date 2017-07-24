export class NotificationSettings {
  private static notificationSettings = {
    placement: {
      from: 'bottom',
      align: 'right'
    },
    animate: {
      enter: 'animated fadeInUp',
      exit: 'animated fadeOutDown'
    }
  };

  static getNotificationSettings(): Object {
    return this.notificationSettings;
  }
}
