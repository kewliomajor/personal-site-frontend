import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Response} from '@angular/http'
import {NotificationSettings} from '../../model/notification_settings';
declare var $: any;

@Injectable()
export class DefaultErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error) {

    let value = null;
    if (error instanceof Response) {
      const json = (error.json()).description || JSON.stringify(error.json());
      value = `${error.status} (${error.statusText}): ${json}`
    } else {
      value = error.toString();
    }

    $.notify({
      icon: 'fa fa-exclamation-triangle',
      title: '<strong>Error:</strong>',
      message: value
    }, $.extend({
      type: 'danger'
    }, NotificationSettings.getNotificationSettings()))
  }
}
