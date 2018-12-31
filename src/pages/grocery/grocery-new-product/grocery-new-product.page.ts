import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ProductProvider } from '../../../providers/product/product.provider';
import { HeaderModel } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GroceryProduct } from '../../../model/backend/product/grocery-product';

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


  constructor(public productProvider: ProductProvider, public viewCtrl: ViewController) {
    this.headerModel = new HeaderModel("New products", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
  }

  ionViewDidLoad() {
    this.possibleProducts = [];
    this.productProvider.getAllProducts().then((products) => {
      products.forEach(product => {
        this.possibleProducts.push(new GroceryProduct(product, false));
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
        this.possibleProducts[i].checked = false;
        newProducts.push(this.possibleProducts[i])
      }
    }
    this.viewCtrl.dismiss(newProducts);
  }
}
