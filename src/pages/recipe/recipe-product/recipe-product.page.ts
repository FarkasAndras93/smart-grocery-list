import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { HeaderModel } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GlobalUtils } from '../../../utils/global-utils';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';
import { Recipe } from '../../../model/backend/recipe/recipe';
import { Product } from '../../../model/backend/product/product';
import { ProductProvider } from '../../../providers/product/product.provider';
import { GroceryProduct } from '../../../model/backend/product/grocery-product';
import { MyProduct } from '../../../model/backend/product/my-product';
import { RecipeProduct } from '../../../model/frontend/product/recipe-product';

@IonicPage()
@Component({
  selector: 'recipe-product',
  templateUrl: 'recipe-product.page.html'
})
export class RecipeProductPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof RecipeProductPage
   */
  public headerModel: HeaderModel;

  /**
   * Products which can be choosen.
   *
   * @type {Product[]}
   * @memberof RecipeProductPage
   */
  public possibleProducts: RecipeProduct[];

  /**
   * Filter products.
   *
   * @type {string}
   * @memberof RecipeProductPage
   */
  public searchProduct: string;


  constructor(private toast: ToastProvider, public viewCtrl: ViewController, private groceryProvider: GroceryListProvider, private storage: StorageProvider,
    public productProvider: ProductProvider) {
    this.headerModel = new HeaderModel("New recipe", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
  }

  ionViewDidLoad() {
    this.possibleProducts = [];
    this.productProvider.getAllProducts().then((products) => {
      products.forEach(product => {
        this.possibleProducts.push(new RecipeProduct(product.name, product.type, 0, false));
      });
    }).catch(error => {
      console.error("Error while returning all products.");
    });
  }

  /**
   * Method to dismiss modal.
   *
   * @memberof RecipeProductPage
   */
  public dismissModal() {
    this.viewCtrl.dismiss();
  }

  /**
   * Create new recipe.
   *
   * @memberof RecipeProductPage
   */
  public addProducts() {
    let products: RecipeProduct[] = this.possibleProducts.filter(product => product.checked == true);
    if (products.filter(
      product => {
        if (GlobalUtils.isUndefinedOrNull(product.weight) || product.weight <= 0) {
          return true;
        } else {
          return false;
        }
      }).length > 0) {
      this.toast.showErrorMessage("All checked products needs to have weight value!")
    } else {
      let selectedProducts: MyProduct[] = [];
      products.forEach(product => {
        selectedProducts.push(new MyProduct(product.name, product.type, product.weight));
      })
      this.viewCtrl.dismiss(selectedProducts);
    }
  }

}
