import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ViewController } from 'ionic-angular';
import { Product, PRODUCT_TYPES } from '../../../model/backend/product/product';
import { ProductProvider } from '../../../providers/product/product.provider';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GlobalUtils } from '../../../utils/global-utils';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';

@IonicPage()
@Component({
  selector: 'product-new',
  templateUrl: 'product-new.page.html'
})
export class ProductNewPage {

  /**
   * New product which will be added to the fridge.
   *
   * @type {Product}
   * @memberof ProductNewPage
   */
  product: Product;

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof AFinderPage
   */
  public headerModel: HeaderModel;

  /**
   * Possible periods, which can be choosed
   *
   * @type {Map<PRODUCT_TYPES, string>}
   * @memberof StatisticFilterComponent
   */
  public possibleTypes: Map<PRODUCT_TYPES, string> = new Map();


  constructor(public navCtrl: NavController, public productProvider: ProductProvider, public modalCtrl: ModalController, private toast: ToastProvider,
    public viewCtrl: ViewController) {
    this.headerModel = new HeaderModel("New product", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
    this.initPossibleTypes();
    this.product = new Product("", undefined, 0);
  }

  ionViewDidLoad() {
    this.productProvider.getProductWeightOnSensor().then((weight) => {
      this.product.weight = weight;
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
    if (GlobalUtils.isEmpty(this.product.name)) {
      this.toast.showErrorMessage("Product should have a name!")
    } else if (GlobalUtils.isUndefinedOrNull(this.product.type) || GlobalUtils.isEmpty(this.product.type.toString())) {
      this.toast.showErrorMessage("Product should have a type!")
    } else if (this.product.weight == 0) {
      this.toast.showErrorMessage("There is nothing on sensor!")
    } else {
      this.viewCtrl.dismiss(this.product);
    }
  }

  /**
   * Initializes possible types map.
   *
   * @private
   * @memberof ProductNewPage
   */
  private initPossibleTypes() {
    this.possibleTypes.set(PRODUCT_TYPES.DAIRY_PRODUCT, "Dairy");
    this.possibleTypes.set(PRODUCT_TYPES.MEATS, "Meat");
    this.possibleTypes.set(PRODUCT_TYPES.PASTRY, "Pastry");
    this.possibleTypes.set(PRODUCT_TYPES.VEGETABLE, "Vegetable");
  }

}
