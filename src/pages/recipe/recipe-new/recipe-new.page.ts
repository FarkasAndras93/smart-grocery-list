import { Component, Inject } from '@angular/core';
import { IonicPage, ViewController, ModalController, Events, NavController } from 'ionic-angular';
import { HeaderModel } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GlobalUtils } from '../../../utils/global-utils';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';
import { Recipe } from '../../../model/backend/recipe/recipe';
import { ProductProvider } from '../../../providers/product/product.provider';
import { MyProduct } from '../../../model/backend/product/my-product';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../app/app.config';
import { RecipeProduct } from '../../../model/frontend/product/recipe-product';

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
   * @memberof RecipeNewPage
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
   * Label of the ingredients
   *
   * @type {string}
   * @memberof RecipeNewPage
   */
  public ingredientsLabel: string = "";


  constructor(private toast: ToastProvider, public viewCtrl: ViewController, private navCtrl: NavController, private storage: StorageProvider,
    public productProvider: ProductProvider, private modalCtrl: ModalController, private event: Events, @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {
    this.headerModel = new HeaderModel("New recipe", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
    this.newRecipe = new Recipe("", [], "", [], storage.getLoggedUser());
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
   * Method to load ingredients select popup.
   *
   * @memberof RecipeNewPage
   */
  public loadIngredientsSelect() {
    let modal = this.modalCtrl.create('RecipeProductPage', { "products": this.newRecipe.products });
    modal.present();
    modal.onDidDismiss((result: RecipeProduct[]) => {
      if (!GlobalUtils.isUndefinedOrNull(result)) {
        if (result.length > 0) {
          result.forEach(product => {
            if (product.checked) {
              this.newRecipe.products.push(new MyProduct(product.name, product.type, product.weight));
            } else {
              this.newRecipe.products = this.newRecipe.products.filter(obj => obj.name != product.name);
            }
          })
          this.ingredientsLabel = "";
          for (let i = 0; i < this.newRecipe.products.length; i++) {
            this.ingredientsLabel += this.newRecipe.products[i].name;
            if (i != this.newRecipe.products.length - 1) {
              this.ingredientsLabel += ",";
            }
          }
        }
      }
    });
  }

  /**
   * Create new recipe.
   *
   * @memberof RecipeNewPage
   */
  public createNewRecipe() {
    if (GlobalUtils.isEmpty(this.newRecipe.name)) {
      this.toast.showErrorMessage("Recipe title cannot be empty!")
    } else if (this.newRecipe.products.length == 0) {
      this.toast.showErrorMessage("Recipe needs to have ingredients!")
    } else {
      this.event.publish(this.config.newRecipeCreated, this.newRecipe);
      this.navCtrl.pop();
    }
  }
}
