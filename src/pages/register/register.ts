import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/backend/user/user';
import { AngularFireAuth} from 'angularfire2/auth';
import { HeaderModel, HEADER_COLORS } from '../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../providers/tehnical/toast/toast.provider';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseDatabaseUser } from '../../model/backend/user/firebaseDatabaseUser';

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

  constructor(private fdb: AngularFireDatabase,private afauth :AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,  private toast: ToastProvider) {
    this.headerModel = new HeaderModel("Register page", HEADER_COLORS.BASE);
    this.user = new User("", "",false);
  }



  async register(user: User){
    try{
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user.username, user.password);
      let fuser: FirebaseDatabaseUser = new FirebaseDatabaseUser(user.id, user.admin);
      this.fdb.list("User").push(user);
      console.log(result);
      this.toast.showSuccessMessage("You have registered successfully!", undefined, false);
      this.navCtrl.popTo("LoginPage");
    }
    catch(e){
      this.toast.showErrorMessage("Could not register");
      console.error(e);
    }
  }

}
