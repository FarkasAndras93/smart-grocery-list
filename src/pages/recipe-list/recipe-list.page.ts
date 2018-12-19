import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../model/common/HeaderModel';
import { ButtonModel } from '../../model/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { GroceryList } from '../../model/grocery-list/grocery-list';
import { GroceryListProvider } from '../../providers/grocery-list/grocery-list.provider';

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


  constructor(public navCtrl: NavController, public groceryListProvider: GroceryListProvider) {
    this.headerModel = new HeaderModel("Recipe List", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {

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
