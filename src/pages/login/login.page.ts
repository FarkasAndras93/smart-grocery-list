import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { User } from '../../model/backend/user/user';
import { HeaderModel, HEADER_COLORS } from '../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../providers/tehnical/toast/toast.provider';

@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.page.html'
})
export class LoginPage {

  /**
   * User for login.
   *
   * @type {MyProduct[]}
   * @memberof LoginPage
   */
  user: User;

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof LoginPage
   */
  public headerModel: HeaderModel;


  constructor(public navCtrl: NavController, private toast: ToastProvider) {
    this.headerModel = new HeaderModel("Login page", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {
  }

}
