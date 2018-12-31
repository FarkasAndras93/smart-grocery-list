import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GroceryList } from '../../../model/backend/grocery-list/grocery-list';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GroceryProduct } from '../../../model/backend/product/grocery-product';
import { GlobalUtils } from '../../../utils/global-utils';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';

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


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public groceryListProvider: GroceryListProvider, private toast: ToastProvider,
    private storage: StorageProvider) {
    this.headerModel = new HeaderModel("Grocery List", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
    this.groceryLists = [];
  }

  ionViewDidLoad() {
    this.groceryListProvider.getGroceryLists(this.storage.getLoggedUser()).then((groceryLists) => {
      this.groceryLists = groceryLists;
    }).catch(error => {
      console.error("Error while geting grocery lists from backend!");
      this.toast.showErrorMessage("Error while geting grocery lists from backend!");
    });
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
    let modal = this.modalCtrl.create('GroceryNewPage');
    modal.present();
    modal.onDidDismiss(result => {
      if (!GlobalUtils.isUndefinedOrNull(result)) {
        this.groceryLists.push(result);
        this.toast.showSuccessMessage("Grocery list was created.", undefined, false);
      }
    });
  }

  /**
   * Method to calculate checked products number for grocery lists.
   *
   * @param {GroceryProduct[]} groceryProduct
   * @returns
   * @memberof GroceryListPage
   */
  public getCheckedProductsNumber(groceryProduct: GroceryProduct[]) {
    let checked = 0;
    groceryProduct.forEach((product) => {
      if (product.checked) {
        checked++;
      }
    });
    return checked + "/" + groceryProduct.length;
  }

}
