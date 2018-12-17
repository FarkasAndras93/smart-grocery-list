import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ViewController } from 'ionic-angular';
import { Product } from '../../model/product/product';
import { ProductProvider } from '../../providers/product/product.provider';
import { HeaderModel, HEADER_COLORS } from '../../model/common/HeaderModel';
import { ButtonModel } from '../../model/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { GlobalUtils } from '../../utils/global-utils';
import { ToastProvider } from '../../providers/tehnical/toast/toast.provider';

@IonicPage()
@Component({
  selector: 'product-new',
  templateUrl: 'product-new.page.html'
})
export class ProductNewPage {

  /**
   * New product which will be added to the fridge.
   *
   * @type {Product[]}
   * @memberof ProductNewPage
   */
  products: Product;

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof AFinderPage
   */
  public headerModel: HeaderModel;


  constructor(public navCtrl: NavController, public productProvider: ProductProvider, public modalCtrl: ModalController, private toast: ToastProvider,
    public viewCtrl: ViewController) {
    this.headerModel = new HeaderModel("New product", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
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

}
