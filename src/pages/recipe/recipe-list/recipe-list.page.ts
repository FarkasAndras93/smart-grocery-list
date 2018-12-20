import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { Recipe } from '../../../model/backend/recipe/recipe';
import { RecipeProvider } from '../../../providers/recipe/recipe.provider';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';

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


  constructor(public navCtrl: NavController, public recipeProvider: RecipeProvider, private toast: ToastProvider) {
    this.headerModel = new HeaderModel("Recipe List", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {
    this.recipeProvider.getRecipeList().then((recipeList) => {
      this.recipeList = recipeList;
    }).catch(error => {
      console.error("Error while geting recipe list from backend!");
      this.toast.showErrorMessage("Error while geting recipe list from backend!");
    });
  }

  /**
   * Method to open recipe details.
   *
   * @memberof RecipeListPage
   */
  public openRecipeDetails(recipe: Recipe) {
    this.navCtrl.push("RecipeDetailPage", {"recipe": recipe});
  }

  /**
   * Method to create a new grocery list.
   *
   * @memberof RecipeListPage
   */
  public createRecipe() {

  }

}
