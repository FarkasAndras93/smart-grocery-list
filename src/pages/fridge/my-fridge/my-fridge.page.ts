import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, AlertController } from 'ionic-angular';
import { Product } from '../../../model/backend/product/product';
import { ProductProvider } from '../../../providers/product/product.provider';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GlobalUtils } from '../../../utils/global-utils';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { MyProduct } from '../../../model/backend/product/my-product';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';

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


  constructor(public navCtrl: NavController, public productProvider: ProductProvider, public modalCtrl: ModalController, private toast: ToastProvider, private alertCtrl: AlertController,
    private storage: StorageProvider) {
    this.headerModel = new HeaderModel("My fridge", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {
    this.productProvider.getProductsInFrigider(this.storage.getLoggedUser()).then(result => {
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
    this.productProvider.getProductWeightOnSensor().then((value: number) => {
      let message = "";
      if (value <= 0) {
        message = "There is nothing on the sensor."
      } else {
        message = "The new product weight is:" + value + ". Do you want to update?"
      }

      let alert = this.alertCtrl.create({
        title: "Edit product",
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Save',
            handler: () => {
              this.productProvider.editProductInTheFridge(product.id, value).then((success) => {
                if (!success) {
                  this.toast.showErrorMessage("Failed to update product weight!", 2000, false);
                } else {
                  this.products[this.products.indexOf(product)].weight = value;
                }
              }).catch(err => {
                console.error("Error while updating product weight!", err);
                this.toast.showErrorMessage("Failed to update product weight!", 2000, false);
              });
            }
          }
        ]
      });
      alert.present();
    }).catch(error => {
      console.log("Error while reading product weight on sensor!");
      this.toast.showErrorMessage("Failed to read product weight on sensor!");
    });
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
