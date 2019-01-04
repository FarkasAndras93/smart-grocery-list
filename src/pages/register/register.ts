import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/backend/user/user';
import { AngularFireAuth} from 'angularfire2/auth';
import { HeaderModel, HEADER_COLORS } from '../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../providers/tehnical/toast/toast.provider';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    /**
   * User for login.
   *
   * @type {MyProduct[]}
   * @memberof RegisterPage
   */
  user: User;

    /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof RegisterPage
   */
  public headerModel: HeaderModel;

  constructor(private afauth :AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,  private toast: ToastProvider) {
    this.headerModel = new HeaderModel("Login page", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
    this.user = new User("", "");
  }



  async register(user: User){
    try{
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user.username, user.password);
      console.log(result);
      this.toast.showSuccessMessage("You have registered successfully!");

    }
    catch(e){
      console.error(e);
    }
  }

}
