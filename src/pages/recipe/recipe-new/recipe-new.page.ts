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
    let modal = this.modalCtrl.create('RecipeProductPage');
    modal.present();
    modal.onDidDismiss(result => {
      if (!GlobalUtils.isUndefinedOrNull(result)) {
        this.newRecipe.products.push(result);
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
    } else {
      this.event.publish(this.config.newRecipeCreated, this.newRecipe);
      this.navCtrl.pop();
    }
  }
}
