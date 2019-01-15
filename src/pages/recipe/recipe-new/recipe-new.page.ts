import { Component, Inject } from '@angular/core';
import { IonicPage, ViewController, ModalController, Events, NavController, NavParams } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
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
  public recipe: Recipe;

  /**
   * Label of the ingredients
   *
   * @type {string}
   * @memberof RecipeNewPage
   */
  public ingredientsLabel: string = "";


  constructor(private toast: ToastProvider, public viewCtrl: ViewController, private navCtrl: NavController, private storage: StorageProvider,
    public productProvider: ProductProvider, private modalCtrl: ModalController, private event: Events, @Inject(APP_CONFIG_TOKEN) private config: AppConfig,
    private navParams: NavParams) {
    this.headerModel = new HeaderModel("New recipe", HEADER_COLORS.BASE);
    if (GlobalUtils.isUndefinedOrNull(navParams.get("recipe"))) {
      this.recipe = new Recipe("","","", [], "", [], this.storage.getLoggedUser().id);
    } else {
      this.recipe = navParams.get("recipe");
      this.setIngredientsLabel();
    }
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
    let modal = this.modalCtrl.create('RecipeProductPage', { "products": this.recipe.products });
    modal.present();
    modal.onDidDismiss((result: RecipeProduct[]) => {
      if (!GlobalUtils.isUndefinedOrNull(result)) {
        if (result.length > 0) {
          result.forEach(product => {
            if (product.checked) {
              this.recipe.products.push(new MyProduct(product.name, product.type, product.weight));
            } else {
              this.recipe.products = this.recipe.products.filter(obj => obj.name != product.name);
            }
          })
          this.setIngredientsLabel();
        }
      }
    });
  }

  /**
   * Create new recipe.
   *
   * @memberof RecipeNewPage
   */
  public editRecipe() {
    if (GlobalUtils.isEmpty(this.recipe.name)) {
      this.toast.showErrorMessage("Recipe title cannot be empty!")
    } else if (this.recipe.products.length == 0) {
      this.toast.showErrorMessage("Recipe needs to have ingredients!")
    } else {
      if (GlobalUtils.isUndefinedOrNull(this.recipe.id)) {
        this.event.publish(this.config.newRecipeCreated, this.recipe);
      } else {
        this.event.publish(this.config.recipeEdited, this.recipe);
      }
      this.navCtrl.pop();
    }
  }

  /**
   * Method to set ingredients label.
   *
   * @memberof RecipeNewPage
   */
  public setIngredientsLabel() {
    this.ingredientsLabel = "";
    for (let i = 0; i < this.recipe.products.length; i++) {
      this.ingredientsLabel += this.recipe.products[i].name;
      if (i != this.recipe.products.length - 1) {
        this.ingredientsLabel += ",";
      }
    }
  }
}
