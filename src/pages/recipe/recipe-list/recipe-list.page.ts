import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, ModalController, Events } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { Recipe } from '../../../model/backend/recipe/recipe';
import { RecipeProvider } from '../../../providers/recipe/recipe.provider';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GlobalUtils } from '../../../utils/global-utils';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../app/app.config';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';

@IonicPage()
@Component({
  selector: 'recipe-list',
  templateUrl: 'recipe-list.page.html'
})
export class RecipeListPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof RecipeListPage
   */
  public headerModel: HeaderModel;

  /**
   * Recipe list.
   *
   * @type {Recipe[]}
   * @memberof RecipeListPage
   */
  public recipeList: Recipe[];


  constructor(public navCtrl: NavController, public recipeProvider: RecipeProvider, private toast: ToastProvider, private modalCtrl: ModalController,
    private event: Events, @Inject(APP_CONFIG_TOKEN) private config: AppConfig, private storage: StorageProvider) {
    this.headerModel = new HeaderModel("Recipe List", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {
    this.recipeProvider.getRecipeList(this.storage.getLoggedUser()).then((recipeList) => {
      this.recipeList = recipeList;
    }).catch(error => {
      console.error("Error while geting recipe list from backend!");
      this.toast.showErrorMessage("Error while geting recipe list from backend!");
    });
    this.event.subscribe(this.config.newRecipeCreated, this.addNewRecipe);
  }

  /**
   * On destroy unsubscribe
   *
   * @memberof RecipeListPage
   */
  ngOnDestroy() {
    this.event.unsubscribe(this.config.newRecipeCreated, this.addNewRecipe);
  }


  /**
   * Add new recipe to recipe list.
   *
   * @memberof RecipeListPage
   */
  public addNewRecipe = (recipe) => {
    this.recipeProvider.createRecipe(this.storage.getLoggedUser(), recipe).then(newRecipe => {
      this.recipeList.push(newRecipe);
      this.toast.showSuccessMessage("Recipe list was created.", undefined, false);
    }).catch(error => {
      console.log("Error while creating recipe!");
      this.toast.showSuccessMessage("Failed to create recipe.", undefined, false);
    });
  }

  public removeRecipe(recipe: Recipe) {
    this.recipeProvider.deleteRecipe(recipe).then(result => {
      if (result) {
        this.recipeList = this.recipeList.filter(obj => obj.id != recipe.id);
      } else {
        this.toast.showSuccessMessage("Failed to delete recipe.", undefined, false);
      }
    }).catch(error => {
      console.log("Error while deleting recipe!");
      this.toast.showSuccessMessage("Failed to delete recipe.", undefined, false);
    });
  }

  /**
   * Method to open recipe details.
   *
   * @memberof RecipeListPage
   */
  public openRecipeDetails(recipe: Recipe) {
    this.navCtrl.push("RecipeDetailPage", { "recipe": recipe });
  }

  /**
   * Method to navigate tonew grocery list page.
   *
   * @memberof RecipeListPage
   */
  public goToNewRecipePage() {
    this.navCtrl.push("RecipeNewPage");
  }

}
