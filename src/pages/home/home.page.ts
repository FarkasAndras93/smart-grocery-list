import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, Toast } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { IconedMenuItem } from '../../model/frontend/common/IconedMenuItem';
import { MENU_TITLE } from '../../app/app.component';
import {AngularFireAuth} from 'angularfire2/auth';
import { ToastProvider } from '../../providers/tehnical/toast/toast.provider';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html'
})
export class HomePage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof BasePage
   */
  public headerModel: HeaderModel;

  /**
   * Home menu items
   *
   * @type {Array<IconedMenuItem>}
   * @memberof HomePage
   */
  menuItems: Array<IconedMenuItem>;

  
  constructor(private toast: ToastProvider ,public navCtrl: NavController, private afAuth: AngularFireAuth) {
    this.headerModel = new HeaderModel("Home", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  
    this.menuItems = new Array<IconedMenuItem>();
    this.menuItems.push(new IconedMenuItem(MENU_TITLE.MY_FRIDGE, "MyFridgePage", "home-icon-statistics.svg"));
    this.menuItems.push(new IconedMenuItem(MENU_TITLE.GROCERY_LIST, "GroceryListPage", "home-icon-search.svg"));
    this.menuItems.push(new IconedMenuItem(MENU_TITLE.RECIPE_LIST, "RecipeListPage", "home-icon-bi-previous.svg"));
    this.menuItems.push(new IconedMenuItem(MENU_TITLE.SETTINGS, "SettingsPage", "home-icon-settings.svg"));
  }

  /**
   * Navigate to page
   *
   * @param {IconedMenuItem} page
   * @memberof HomePage
   */
  goToPage(page: IconedMenuItem) {
    console.log("Go to page: ", page.pageToOpen);

    if (page.pageToOpen != this.navCtrl.getActive().name) {
      this.navCtrl.setRoot(page.pageToOpen);
    }
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.toast.showSuccessMessage("Welcome to Smart grocery" + data.email);
      }
      else{
        this.toast.showErrorMessage("Could not find authentication details");
      }
      
    });
  }

}
