import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { APP_CONFIG_TOKEN, AppConfig } from './app.config';
import { StorageProvider } from '../providers/tehnical/storage/storage.provider';

/**
 * Side Menu Type
 */
type SideMenuItem = { title: MENU_TITLE, component: any, icon?: string, badgeRight?: boolean, badgeValue?: number, badgeColor?: string };

/**
 * Enums for menu titles.
 *
 * @export
 * @enum {number}
 */
export enum MENU_TITLE {
  HOME = "Home",
  MY_FRIDGE = "My fridge",
  GROCERY_LIST = "Grocery list",
  RECIPE_LIST = "Recipe list",
  LOGOUT = "Logout",
  LOGIN = "Login",
  SETTINGS = "Settings"
}


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  /**
   * Navigation
   *
   *
   * @type {Nav}
   * @memberof MyApp
   */
  @ViewChild(Nav) nav: Nav;

  /**
   * Root page
   *
   * @type {*}
   * @memberof MyApp
   */
  rootPage: any = 'LoginPage';

  /**
  * List of pages in logged in state
  *
  * @private
  * @type {Array<SideMenuItem>}
  * @memberof MyApp
  */
  private loggedInPages: Array<SideMenuItem> = [
    { title: MENU_TITLE.HOME, component: 'HomePage', icon: 'home' },
    { title: MENU_TITLE.MY_FRIDGE, component: 'MyFridgePage', icon: 'basket' },
    { title: MENU_TITLE.GROCERY_LIST, component: 'GroceryListPage', icon: 'cart' },
    { title: MENU_TITLE.RECIPE_LIST, component: 'RecipeListPage', icon: 'paper' },
    { title: MENU_TITLE.LOGOUT, component: 'LoginPage', icon: 'log-out', badgeRight: false },
    { title: MENU_TITLE.SETTINGS, component: 'SettingsPage', icon: 'settings' }
  ]

  /**
  * List of pages in logged out state
  *
  * @private
  * @type {Array<SideMenuItem>}
  * @memberof MyApp
  */
  private loggedOutPages: Array<SideMenuItem> = [
    { title: MENU_TITLE.LOGIN, component: 'LoginPage', icon: 'log-in' },
    { title: MENU_TITLE.SETTINGS, component: 'SettingsPage', icon: 'settings' }
  ]


  /**
   * Current pages in the side menu
   *
   * @type {Array<SideMenuItem>}
   * @memberof MyApp
   */
  pages: Array<SideMenuItem>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private event: Events,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig, private storage: StorageProvider) {
    platform.ready().then(() => {
      this.pages = this.loggedOutPages;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //Subscribing to login and logout events
      this.event.subscribe(this.config.loginConfig.logoutEventKey, this.logoutEventComplete);
      this.event.subscribe(this.config.loginConfig.loggedInCompleteEventKey, this.loginEventComplete);
    });
  }

  /**
   *  Visibilitychange event is removed on destroy.
   *
   * @memberof ChatPage
   */
  ngOnDestroy() {
    //Unsubscribing to login and logout events
    this.event.unsubscribe(this.config.loginConfig.logoutEventKey, this.logoutEventComplete);
    this.event.unsubscribe(this.config.loginConfig.loggedInCompleteEventKey, this.loginEventComplete);
  }

  /**
   * Methods after login was completed.
   *
   * @private
   * @memberof MyApp
   */
  private loginEventComplete = () => {
    this.pages = this.loggedInPages;
  }

  /**
   * Methods after logout was completed.
   *
   * @private
   * @memberof MyApp
   */
  private logoutEventComplete = () => {
    this.pages = this.loggedOutPages;
    this.storage.saveLocal(this.config.loginConfig.hasLoggedIn, false);
  }

  /**
   * Opens a page as root page
   *
   * @param {any} page
   * @memberof MyApp
   */
  openPage(page) {
    if (page.component != this.nav.getActive().name) {
      console.log('open page ', page)

      if (page.title == MENU_TITLE.LOGOUT) {
        this.event.publish(this.config.loginConfig.logoutEventKey);
      }

      this.nav.setRoot(page.component);
    }
  }
}

