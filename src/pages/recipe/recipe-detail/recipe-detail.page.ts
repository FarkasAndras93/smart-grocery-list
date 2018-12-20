import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';
import { Recipe } from '../../../model/backend/recipe/recipe';

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


  constructor(public navCtrl: NavController, private navParams: NavParams, public groceryListProvider: GroceryListProvider) {
    this.recipe = this.navParams.get("recipe");
    this.headerModel = new HeaderModel(this.recipe.name, HEADER_COLORS.BASE);
  }

  ionViewDidLoad() {

  }

}
