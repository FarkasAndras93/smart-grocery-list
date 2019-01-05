import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { Recipe } from '../../../model/backend/recipe/recipe';
import { RecipeProvider } from '../../../providers/recipe/recipe.provider';
import { RecipeNote } from '../../../model/backend/recipe/recipe-note';
import { GlobalUtils } from '../../../utils/global-utils';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';
import { APP_CONFIG_TOKEN, AppConfig } from '../../../app/app.config';
import { ProductProvider } from '../../../providers/product/product.provider';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';
import { GroceryList } from '../../../model/backend/grocery-list/grocery-list';
import { GroceryProduct } from '../../../model/backend/product/grocery-product';
import { MyProduct } from '../../../model/backend/product/my-product';

@IonicPage()
@Component({
  selector: 'recipe-detail',
  templateUrl: 'recipe-detail.page.html'
})
export class RecipeDetailPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof RecipeDetailPage
   */
  public headerModel: HeaderModel;

  /**
   * Current recipe
   *
   * @type {Recipe}
   * @memberof RecipeDetailPage
   */
  public recipe: Recipe;

  /**
   * My note message.
   *
   * @type {string}
   * @memberof RecipeDetailPage
   */
  public myNote: string;


  constructor(private navParams: NavParams, public recipeProvider: RecipeProvider, public productProvider: ProductProvider,
    private toast: ToastProvider, private storage: StorageProvider, @Inject(APP_CONFIG_TOKEN) private config: AppConfig,
    private groceryProvider: GroceryListProvider) {
    this.recipe = this.navParams.get("recipe");
    this.headerModel = new HeaderModel(this.recipe.name, HEADER_COLORS.BASE);
  }

  ionViewDidLoad() {
    this.scrollDown();
  }

  /**
   * Method to create grocery list for recipe ingredients.
   *
   * @memberof RecipeDetailPage
   */
  public createGroceryList() {
    this.productProvider.getProductsInFrigider(this.storage.getLoggedUser()).then(productsInFridge => {
      let productsNeeded: GroceryProduct[] = [];
      this.recipe.products.forEach(recipeProduct => {
        let prodInFridge = productsInFridge.filter(fridgeProd => fridgeProd.name == recipeProduct.name)[0];
        if (GlobalUtils.isUndefinedOrNull(prodInFridge) || prodInFridge.weight < recipeProduct.weight) {
          this.productProvider.getProductForName(recipeProduct.name).then(product => {
            productsNeeded.push(new GroceryProduct(new MyProduct(product.name, product.type, 
              GlobalUtils.isUndefinedOrNull(prodInFridge) ? recipeProduct.weight : recipeProduct.weight - prodInFridge.weight), false));
          }).catch(error =>{
            console.log("Error while geting product for name!", error);
            this.toast.showErrorMessage("Error not all products are added to grocery list!");
          });
        }
      });
      this.groceryProvider.createGroceryList(new GroceryList(this.recipe.name + new Date().toString(), productsNeeded,
        new Date().toString(), this.storage.getLoggedUser())).then(result => {
          this.toast.showSuccessMessage("Grocery list was created.")
        }).catch(error =>{
          console.log("Error while creating grocery list!", error);
          this.toast.showErrorMessage("Failed to create grocery list!");
        });
    }).catch(error => {
      console.log("Error while returning all products in frigider!", error);
      this.toast.showErrorMessage("Failed to create grocery list for recipe!");
    });
  }

  /**
   * Method to add my note to task.
   *
   * @memberof TaskDetailsPage
   */
  public async addNote() {
    this.myNote = await this.storage.getConfig(this.config.userAlias) + ":" + this.myNote;
    this.recipeProvider.createNote(this.recipe.id, new RecipeNote(this.myNote, new Date().toString())).then(note => {
      if (GlobalUtils.isUndefinedOrNull(this.recipe.notes)) {
        this.recipe.notes = [];
      }
      this.recipe.notes.push(note);
      this.myNote = "";
      this.scrollDown();
    }).catch(err => {
      console.error("Error while creating recipe note!", err);
      this.toast.showErrorMessage("Failed to create note!.");
    });
  }

  /**
   * Scroll down in comments list.
   *
   * @private
   * @memberof TaskDetailsPage
   */
  private scrollDown() {
    setTimeout(() => {
      try {
        var itemList = document.getElementById("note-scroll");
        if (!GlobalUtils.isUndefinedOrNull(itemList.getElementsByTagName("ion-item")[0])) {
          itemList.scrollTop = itemList.scrollHeight + itemList.getElementsByTagName("ion-item")[0].scrollHeight;
        }
      }
      catch (e) { };
    }, 250);
  }

}
