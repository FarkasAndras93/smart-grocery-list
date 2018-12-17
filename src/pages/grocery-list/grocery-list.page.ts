import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Product } from '../../model/product/product';
import { ProductProvider } from '../../providers/product/product.provider';
import { HeaderModel, HEADER_COLORS } from '../../model/common/HeaderModel';
import { ButtonModel } from '../../model/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';

@IonicPage()
@Component({
  selector: 'grocery-list',
  templateUrl: 'grocery-list.page.html'
})
export class GroceryListPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof GroceryListPage
   */
  public headerModel: HeaderModel;


  constructor(public navCtrl: NavController, public productProvider: ProductProvider) {
    this.headerModel = new HeaderModel("Grocery List", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
  }

  ionViewDidLoad() {

  }

}
