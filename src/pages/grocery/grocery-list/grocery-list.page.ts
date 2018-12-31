import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GroceryList } from '../../../model/backend/grocery-list/grocery-list';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GroceryProduct } from '../../../model/backend/product/grocery-product';
import { CheckedProductsPipe } from '../../../pipes/checked-products/checked-products.pipe';
import { Product } from '../../../model/backend/product/product';

@IonicPage()
@Component({
  selector: 'grocery-list',
  templateUrl: 'grocery-list.page.html'
})
export class GroceryListPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof GroceryListPage
   */
  public headerModel: HeaderModel;

  /**
   * Grocery lists
   *
   * @type {GroceryList[]}
   * @memberof GroceryListPage
   */
  public groceryLists: GroceryList[];


  constructor(public navCtrl: NavController, public groceryListProvider: GroceryListProvider, private toast: ToastProvider) {
    this.headerModel = new HeaderModel("Grocery List", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
    this.groceryLists = [];
  }

  ionViewDidLoad() {
    this.groceryListProvider.getGroceryLists().then((groceryLists) => {
      this.groceryLists = groceryLists;
    }).catch(error => {
      console.error("Error while geting grocery lists from backend!");
      this.toast.showErrorMessage("Error while geting grocery lists from backend!");
    });
  }

  ionViewDidEnter() {
    //TODO - ugly solution to update checked products
    let copy = Object.assign([], this.groceryLists);
    this.groceryLists = [];
    setInterval(() => {
      this.groceryLists = Object.assign([], copy);
    }, 300);
  }

  /**
   * Method to open grocery list.
   *
   * @memberof GroceryListPage
   */
  public openGroceryList(groceryList: GroceryList) {
    this.navCtrl.push("GroceryListDetailPage", { "grocery-list": groceryList });
  }

  /**
   * Method to create a new grocery list.
   *
   * @memberof GroceryListPage
   */
  public createGroceryList() {
    console.log(JSON.stringify(this.groceryLists));
    // this.groceryLists.push(new GroceryList("test", [new GroceryProduct(new Product("", null), true)], ""));

  }

}
