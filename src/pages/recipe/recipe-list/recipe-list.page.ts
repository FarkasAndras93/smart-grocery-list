import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/common/HeaderModel';
import { ButtonModel } from '../../../model/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { GroceryList } from '../../../model/grocery-list/grocery-list';
import { Recipe } from '../../../model/recipe/recipe';
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
   * @memberof GroceryListPage
   */
  public headerModel: HeaderModel;

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
   * @memberof GroceryListPage
   */
  public openRecipeDetails(groceryList: GroceryList) {
    this.navCtrl.push("GroceryListDetailPage", {"grocery-list": groceryList});
  }

  /**
   * Method to create a new grocery list.
   *
   * @memberof GroceryListPage
   */
  public createRecipe() {

  }

}
