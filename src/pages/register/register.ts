import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/backend/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HeaderModel, HEADER_COLORS } from '../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../providers/tehnical/toast/toast.provider';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseDatabaseUser } from '../../model/backend/user/firebaseDatabaseUser';
import { GlobalUtils } from '../../utils/global-utils';

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
   * User for register.
   *
   * @type {MyProduct[]}
   * @memberof RegisterPage
   */
  user: User;

  /**
   * Confirm password field.
   *
   * @type {string}
   * @memberof RegisterPage
   */
  confirmPassword: string;

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof RegisterPage
   */
  public headerModel: HeaderModel;

  constructor(private fdb: AngularFireDatabase,private afauth :AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,  private toast: ToastProvider) {
    this.headerModel = new HeaderModel("Register page", HEADER_COLORS.BASE);
    this.user = new User("", "",false);
  }

  /**
   * Registers a new user
   *
   * @param {User} user
   * @memberof RegisterPage
   */
  public async register() {
    if (this.validate()) {
      try {
        const result = await this.afauth.auth.createUserWithEmailAndPassword(this.user.username, this.user.password);
        console.log(result);
        this.toast.showSuccessMessage("You have registered successfully!", undefined, false);
        this.navCtrl.popTo("LoginPage");
      } catch (e) {
        this.toast.showErrorMessage("Could not register");
        console.error("Error in register", e);
      }
    }
  }

  /**
   * Method to validate register
   *
   * @returns {boolean}
   * @memberof RegisterPage
   */
  public validate(): boolean {
    let valid: boolean = false;

    if (GlobalUtils.isEmpty(this.user.username)) {
      this.toast.showErrorMessage("Email cannot be empty!");
    } else if (this.user.username.indexOf("@") == -1) {
      this.toast.showErrorMessage("Not well formed email!");
    } else if (GlobalUtils.isEmpty(this.user.password)) {
      this.toast.showErrorMessage("Password cannot be empty!");
    } else if (this.confirmPassword != this.user.password) {
      this.toast.showErrorMessage("Password and confirm password is not the same!");
    } else {
      valid = true;
    }

    return valid;
  }

}
