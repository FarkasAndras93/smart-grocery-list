import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { Product } from '../../model/product/product';
import { ProductProvider } from '../../providers/product/product.provider';
import { HeaderModel, HEADER_COLORS } from '../../model/common/HeaderModel';
import { ButtonModel } from '../../model/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { GlobalUtils } from '../../utils/global-utils';
import { ToastProvider } from '../../providers/tehnical/toast/toast.provider';

@IonicPage()
@Component({
  selector: 'my-fridge',
  templateUrl: 'my-fridge.page.html'
})
export class MyFridgePage {

  /**
   * Products in the fridge.
   *
   * @type {Product[]}
   * @memberof MyFridgePage
   */
  products: Product[];

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
      console.log("Error");
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
        if (result instanceof Product) {
          this.products.push(result);
          this.toast.showSuccessMessage("Product added with success.");
        } else {
          this.toast.showErrorMessage("Add product failed!");
        }
      }
    });
  }

}
