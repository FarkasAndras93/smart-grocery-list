import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../../providers/product/product.provider';
import { HeaderModel } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GroceryProduct } from '../../../model/backend/product/grocery-product';
import { MyProduct } from '../../../model/backend/product/my-product';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';

@IonicPage()
@Component({
  selector: 'grocery-new-product',
  templateUrl: 'grocery-new-product.page.html'
})
export class GroceryNewProductPage {

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
  public possibleProducts: GroceryProduct[];

  /**
   * Filter products.
   *
   * @type {string}
   * @memberof GroceryNewProductPage
   */
  public searchProduct: string;


  constructor(private navParams: NavParams,public productProvider: ProductProvider, public viewCtrl: ViewController, private toast: ToastProvider) {
    this.headerModel = new HeaderModel("New products", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
  }

  ionViewDidLoad() {
    this.possibleProducts = [];
    this.productProvider.getAllProducts().then((products) => {
      products.forEach(product => {
        if(this.navParams.get("existentProducts").filter(posProd => posProd.product.name).length <= 0){
          this.possibleProducts.push(new GroceryProduct("",product, false));
        }
      });
    }).catch(error => {
      console.error("Error while returning all products.");
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
  public addProducts() {
    let newProducts: GroceryProduct[] = [];
    for (let i = 0; i < this.possibleProducts.length; i++) {
      if (this.possibleProducts[i].checked == true) {
        // if (this.possibleProducts[i].product.weight <= 0) {
        //   this.toast.showErrorMessage("All checked products needs to have weight value!");
        //   return;
        // } -----------------GROCERY PRODUCT -nak  nincs sulya, az csak egy lista amit kell vasaroljon
        this.possibleProducts[i].checked = false;
        newProducts.push(this.possibleProducts[i])
      }
    }
      return this.viewCtrl.dismiss(newProducts);;
  }
}
