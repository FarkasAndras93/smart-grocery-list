import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/common/HeaderModel';
import { GroceryList } from '../../../model/grocery-list/grocery-list';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';

@IonicPage()
@Component({
  selector: 'grocery-list-detail',
  templateUrl: 'grocery-list-detail.page.html'
})
export class GroceryListDetailPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof GroceryListPage
   */
  public headerModel: HeaderModel;

  /**
   * Grocery list
   *
   * @type {GroceryList}
   * @memberof GroceryListPage
   */
  public groceryList: GroceryList;


  constructor(public navCtrl: NavController, private navParams: NavParams, public groceryListProvider: GroceryListProvider) {
    this.groceryList = this.navParams.get("grocery-list");
    this.headerModel = new HeaderModel(this.groceryList.name, HEADER_COLORS.BASE);
  }

  ionViewDidLoad() {

  }

  /**
   * Method to create a new grocery list.
   *
   * @memberof GroceryListPage
   */
  public addProduct() {

  }

}