import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { HeaderModel } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GroceryList } from '../../../model/backend/grocery-list/grocery-list';
import { GlobalUtils } from '../../../utils/global-utils';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';
import { Recipe } from '../../../model/backend/recipe/recipe';
import { Product } from '../../../model/backend/product/product';
import { ProductProvider } from '../../../providers/product/product.provider';

@IonicPage()
@Component({
  selector: 'recipe-new',
  templateUrl: 'recipe-new.page.html'
})
export class RecipeNewPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof AFinderPage
   */
  public headerModel: HeaderModel;

  /**
   * New recipe object.
   *
   * @type {Recipe}
   * @memberof RecipeNewPage
   */
  public newRecipe: Recipe;

  /**
   * Products which can be choosen.
   *
   * @type {Product[]}
   * @memberof RecipeNewPage
   */
  public possibleProducts: Product[];

  /**
   * Selected product id from selection.
   *
   * @type {number[]}
   * @memberof RecipeNewPage
   */
  public selectedProductId: number[];


  constructor(private toast: ToastProvider, public viewCtrl: ViewController, private groceryProvider: GroceryListProvider, private storage: StorageProvider,
    public productProvider: ProductProvider) {
    this.headerModel = new HeaderModel("New recipe", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
    this.newRecipe = new Recipe("", [], "", [], storage.getLoggedUser());
  }

  ionViewDidLoad() {
    this.productProvider.getAllProducts().then((products) => {
      this.possibleProducts = products;
    }).catch(error => {
      console.error("Error while returning all products.");
    });
  }

  /**
   * Method to dismiss modal.
   *
   * @memberof GroceryNewPage
   */
  public dismissModal() {
    this.viewCtrl.dismiss();
  }

  /**
   * Create new recipe.
   *
   * @memberof RecipeNewPage
   */
  public createNewRecipe() {
    if (GlobalUtils.isUndefinedOrNull(this.selectedProductId)) {
      this.toast.showErrorMessage("Recipe needs to have products!")
    } else if (GlobalUtils.isEmpty(this.newRecipe.name)) {
      this.toast.showErrorMessage("Recipe title cannot be empty!")
    } else {
      let products: Product[] = this.getMyProductsForIds();
      this.newRecipe.products = this.newRecipe.products.concat(products);
      this.viewCtrl.dismiss(this.newRecipe);
    }
  }

  /**
   * Method to get products from possibleProducts list for selected ids.
   *
   * @private
   * @param {number} id
   * @returns {Product}
   * @memberof ProductNewPage
   */
  private getMyProductsForIds(): Product[] {
    let products: Product[] = [];
    for (let i = 0;i<this.possibleProducts.length; i++) {
      let product: Product = this.possibleProducts.filter(product => product.id == this.selectedProductId[i])[0];
      if (!GlobalUtils.isUndefinedOrNull(product)) {
        products.push(product);
      }
    }
    return products;
  }
}
