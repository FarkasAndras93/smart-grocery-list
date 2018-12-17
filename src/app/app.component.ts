import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home.page';

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
  GROCERY_LIST = "Grocery list"
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
  rootPage: any = 'HomePage';

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
    { title: MENU_TITLE.GROCERY_LIST, component: 'GroceryListPage', icon: 'paper' }
  ]


  /**
   * Current pages in the side menu
   *
   * @type {Array<SideMenuItem>}
   * @memberof MyApp
   */
  pages: Array<SideMenuItem>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.pages = this.loggedInPages;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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

      this.nav.setRoot(page.component);
    }
  }
}

