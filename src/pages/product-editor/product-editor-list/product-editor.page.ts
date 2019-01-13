import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, AlertController } from 'ionic-angular';
import { Product } from '../../../model/backend/product/product';
import { ProductProvider } from '../../../providers/product/product.provider';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GlobalUtils } from '../../../utils/global-utils';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';
import {AngularFireAuth} from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'product-editor',
  templateUrl: 'product-editor.page.html'
})
export class ProductEditorPage {

  /**
   * Products in the database.
   *
   * @type {Product[]}
   * @memberof ProductEditorPage
   */
  products: Product[];

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof ProductEditorPage
   */
  public headerModel: HeaderModel;


  constructor( private afAuth: AngularFireAuth,public navCtrl: NavController, public productProvider: ProductProvider, public modalCtrl: ModalController, private toast: ToastProvider, private alertCtrl: AlertController) {
    this.headerModel = new HeaderModel("Product Editor", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {
    this.productProvider.getAllProducts().then(result => {
      this.products = result;
    }).catch(error =>{
      console.log("Error while geting all products!");
      this.toast.showErrorMessage("Error while geting all products!");
    })
  }

  /**
   * Method to add product in database.
   *
   * @memberof ProductEditorPage
   */
  public createProduct() {
    let modal = this.modalCtrl.create('ProductEditorNewPage');
    modal.present();
    modal.onDidDismiss(result => {
      if (!GlobalUtils.isUndefinedOrNull(result)) {
        if (result instanceof Product) {
          this.productProvider.createProductInDatabase(result).then(newProduct => {
            console.log( result);
            this.products.push(result);
            this.toast.showSuccessMessage("Product added with success.");
          }).catch(err =>{
            console.error("Failed to add new product in database!", err);
            this.toast.showErrorMessage("Add product failed!");
          })
        } else {
          this.toast.showErrorMessage("Add product failed!");
        }
      }
    });
  }

  /**
   * Method to remove product from database.
   *
   * @memberof ProductEditorPage
   */
  public removeProduct(product: Product) {
    this.productProvider.removeProductFromDatabase(product).then((value) =>{
      if (value) {
        this.products.splice(this.products.indexOf(product), 1);
      } else {
        this.toast.showErrorMessage("Failed to remove product!");
      }
    }).catch(error =>{
      console.log("Error while removing product from the database.");
      this.toast.showErrorMessage("Error while removing product!");
    })
  }

}
