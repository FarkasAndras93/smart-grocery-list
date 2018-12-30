import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { Product } from '../../../model/backend/product/product';
import { ProductProvider } from '../../../providers/product/product.provider';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GlobalUtils } from '../../../utils/global-utils';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { MyProduct } from '../../../model/backend/product/my-product';

@IonicPage()
@Component({
  selector: 'my-fridge',
  templateUrl: 'my-fridge.page.html'
})
export class MyFridgePage {

  /**
   * Products in the fridge.
   *
   * @type {MyProduct[]}
   * @memberof MyFridgePage
   */
  products: MyProduct[];

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof AFinderPage
   */
  public headerModel: HeaderModel;


  constructor(public navCtrl: NavController, public productProvider: ProductProvider, public modalCtrl: ModalController, private toast: ToastProvider) {
    this.headerModel = new HeaderModel("My fridge", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {
    this.productProvider.getProductsInFrigider().then(result => {
      this.products = result;
    }).catch(error =>{
      console.log("Error while geting products in frigider!");
      this.toast.showErrorMessage("Error while geting products in frigider!");
    })
  }

  /**
   * Method to add product in my fridge.
   *
   * @memberof MyFridgePage
   */
  public addProduct() {
    let modal = this.modalCtrl.create('ProductNewPage');
    modal.present();
    modal.onDidDismiss(result => {
      if (!GlobalUtils.isUndefinedOrNull(result)) {
        if (result instanceof MyProduct) {
          this.products.push(result);
          this.toast.showSuccessMessage("Product added with success.");
        } else {
          this.toast.showErrorMessage("Add product failed!");
        }
      }
    });
  }

  /**
   * Method to edit product weight/procent/quantity
   *
   * @memberof MyFridgePage
   */
  public editProduct(product: MyProduct) {

  }

  /**
   * Method to remove product from fridge.
   *
   * @memberof MyFridgePage
   */
  public removeProduct(product: MyProduct) {
    this.productProvider.removeProductFromFridge(product.id).then((value) =>{
      if (value) {
        this.products.splice(this.products.indexOf(product), 1);
      } else {
        this.toast.showErrorMessage("Failed to remove product!");
      }
    }).catch(error =>{
      console.log("Error while removing product from the fridge.");
      this.toast.showErrorMessage("Error while removing product!");
    })
  }

}
