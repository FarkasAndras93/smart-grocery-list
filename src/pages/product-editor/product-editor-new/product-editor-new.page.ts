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
  selector: 'product-editor-new',
  templateUrl: 'product-editor-new.page.html'
})
export class ProductEditorNewPage {

  /**
   * New product which will be added to the databse.
   *
   * @type {Product}
   * @memberof ProductEditorNewPage
   */
  public product: Product;

  /**
   * All possible types of product.
   *
   * @memberof ProductEditorNewPage
   */
  public productTypes: Map<string, number>;

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof ProductEditorNewPage
   */
  public headerModel: HeaderModel;


  constructor(public navCtrl: NavController, public productProvider: ProductProvider, public modalCtrl: ModalController, private toast: ToastProvider,
    public viewCtrl: ViewController, private storage: StorageProvider) {
      this.initProductTypes();
    this.headerModel = new HeaderModel("New editor product", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
    this.product = new MyProduct("", undefined, 0, 0);
  }

  ionViewDidLoad() {
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
    if (GlobalUtils.isUndefinedOrNull(this.product.name)) {
      this.toast.showErrorMessage("Product name is empty!")
    } else if (GlobalUtils.isUndefinedOrNull(this.product.type) || this.product.type == 0) {
      this.toast.showErrorMessage("Product type is empty!")
    } else {
      this.viewCtrl.dismiss(this.product);
    }
  }

  /**
   * Initialize possible product types.
   *
   * @private
   * @memberof ProductEditorNewPage
   */
  private initProductTypes() {
    this.productTypes = new Map<string, number>();

    this.productTypes.set("Dairy", PRODUCT_TYPES.DAIRY_PRODUCT);
    this.productTypes.set("Grain", PRODUCT_TYPES.GRAIN_PARTIES);
    this.productTypes.set("Meats", PRODUCT_TYPES.MEATS);
    this.productTypes.set("Pastry", PRODUCT_TYPES.PASTRY);
    this.productTypes.set("Vegetable", PRODUCT_TYPES.VEGETABLE);
  }
}
