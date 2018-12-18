import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular'
import { GlobalUtils } from '../../../utils/global-utils';


/**
 * ToastProvider
 *
 * Shows toast information on the syste
 *
 * @export
 * @class ToastProvider
 */
@Injectable()
export class ToastProvider {

  /**
   * Creates an instance of ToastProvider.
   *
   * @param {ToastController} toastCtrl
   *
   * @memberOf ToastProvider
   */
  constructor(private toastCtrl: ToastController) {
  }


  /**
   * Shows an error message, which disappears automatically 
   *
   * @param {string} message message to show
   *
   * @memberOf ToastProvider
   */
  showErrorMessage(message: string, duration?: number, dismissOnPageChange?: boolean) {
    duration = duration ? duration : message.length < 50 ? 3000 : message.length > 100 ? 5000 : 4000;
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'middle',
      dismissOnPageChange: GlobalUtils.isUndefinedOrNull(dismissOnPageChange) ? true : dismissOnPageChange,
      cssClass: 'error-toast'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /**
   * Shows a success message, which disappears automatically
   * @param message message
   */
  showSuccessMessage(message: string): Promise<any> {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'middle',
      dismissOnPageChange: true,
      cssClass: 'success-toast'
    });

    let p = new Promise((resolve, reject) => {

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        resolve();
      });
    });
    toast.present();
    return p;

  }

}
