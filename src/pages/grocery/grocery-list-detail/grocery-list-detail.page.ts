import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ModalController } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { GroceryList } from '../../../model/backend/grocery-list/grocery-list';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GlobalUtils } from '../../../utils/global-utils';
import { GroceryProduct } from '../../../model/backend/product/grocery-product';
import { ProductProvider } from '../../../providers/product/product.provider';

@IonicPage()
@Component({
  selector: 'grocery-list-detail',
  templateUrl: 'grocery-list-detail.page.html'
})
export class GroceryListDetailPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof GroceryListDetailPage
   */
  public headerModel: HeaderModel;

  /**
   * Grocery list
   *
   * @type {GroceryList}
   * @memberof GroceryListDetailPage
   */
  public groceryList: GroceryList;


  constructor(public navCtrl: NavController, private navParams: NavParams, public groceryListProvider: GroceryListProvider,
    public modalCtrl: ModalController, private toast: ToastProvider, private productProvider: ProductProvider) {
    this.groceryList = this.navParams.get("grocery-list");
    this.headerModel = new HeaderModel(this.groceryList.name, HEADER_COLORS.BASE);
  }

  ionViewDidLoad() {

  }

  /**
   * Method to check product on list.
   *
   * @memberof GroceryListPage
   */
  public checkProduct(product: GroceryProduct) {
    this.productProvider.checkProductInGrocery(product.id, product.checked).then(status => {
      if (!status) {
        this.toast.showErrorMessage("Failed to update product state!");
      } else {
        console.log("Product state was updated with success.");
      }
    }).catch(error => {
      console.log("Error while updating product state.")
      this.toast.showErrorMessage("Failed to update product state!");
    })
  }

  /**
   * Method to create a new grocery list.
   *
   * @memberof GroceryListPage
   */
  public addProduct() {
    let modal = this.modalCtrl.create('GroceryNewProductPage');
    modal.present();
    modal.onDidDismiss(result => {
      if (!GlobalUtils.isUndefinedOrNull(result)) {
        this.groceryList.products = this.groceryList.products.concat(result);
        this.toast.showSuccessMessage("Product added with success.");
      }
    });
  }

}
