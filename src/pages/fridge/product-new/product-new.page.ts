import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ViewController } from 'ionic-angular';
import { PRODUCT_TYPES, Product } from '../../../model/backend/product/product';
import { ProductProvider } from '../../../providers/product/product.provider';
import { HeaderModel } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GlobalUtils } from '../../../utils/global-utils';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { MyProduct } from '../../../model/backend/product/my-product';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';

@IonicPage()
@Component({
  selector: 'product-new',
  templateUrl: 'product-new.page.html'
})
export class ProductNewPage {

  /**
   * New product which will be added to the fridge.
   *
   * @type {MyProduct}
   * @memberof ProductNewPage
   */
  myProduct: MyProduct;

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof AFinderPage
   */
  public headerModel: HeaderModel;

  /**
   * Products which can be choosen.
   *
   * @type {Product[]}
   * @memberof ProductNewPage
   */
  public possibleProducts: Product[];

  /**
   * Selected product id from selection.
   *
   * @type {number}
   * @memberof ProductNewPage
   */
  public selectedProductId: number;


  constructor(public navCtrl: NavController, public productProvider: ProductProvider, public modalCtrl: ModalController, private toast: ToastProvider,
    public viewCtrl: ViewController, private storage: StorageProvider) {
    this.headerModel = new HeaderModel("New product", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
    this.myProduct = new MyProduct("", undefined, 0, 0);
  }

  ionViewDidLoad() {
    this.productProvider.getAllProducts().then((products) => {
      this.possibleProducts = products;
      console.log("Product new page loaded with following products:" + this.possibleProducts);
    }).catch(error =>{
      console.error("Error while returning all products.");
    });
    this.productProvider.getProductWeightOnSensor().then((weight) => {
      this.myProduct.weight = weight;
    }).catch(error =>{
      console.error("Error on weight sensor.");
    });
  }

  /**
   * Method to dismiss modal.
   *
   * @private
   * @memberof TaskQuestionPage
   */
  private dismissModal() {
    this.viewCtrl.dismiss();
  }

  /**
   * Adds product to the fridge.
   *
   * @memberof ProductNewPage
   */
  public addProduct() {
    if (GlobalUtils.isUndefinedOrNull(this.selectedProductId)) {
      this.toast.showErrorMessage("Product needs to be selected!")
    } else if (this.myProduct.weight == 0) {
      this.toast.showErrorMessage("There is nothing on sensor!")
    } else {
       let product: Product = this.getMyProductForId();
       this.myProduct.id = product.id;
       this.myProduct.name = product.name;
       this.myProduct.type = product.type;
       this.myProduct.userId = this.storage.getLoggedUser().id;
       this.viewCtrl.dismiss(this.myProduct);
    }
  }

  /**
   * Method to get product from possibleProducts list for selected id.
   *
   * @private
   * @param {number} id
   * @returns {Product}
   * @memberof ProductNewPage
   */
  private getMyProductForId(): Product {
    for (let i = 0;i<this.possibleProducts.length; i++) {
      if (this.possibleProducts[i].id == this.selectedProductId) {
        return this.possibleProducts[i];
      }
    }
  }
}
