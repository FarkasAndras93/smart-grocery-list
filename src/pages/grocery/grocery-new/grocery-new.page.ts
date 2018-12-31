import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { HeaderModel } from '../../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../../components/simple-app-header/simple-app-header.component';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { GroceryList } from '../../../model/backend/grocery-list/grocery-list';
import { GlobalUtils } from '../../../utils/global-utils';
import { GroceryListProvider } from '../../../providers/grocery-list/grocery-list.provider';

@IonicPage()
@Component({
  selector: 'grocery-new',
  templateUrl: 'grocery-new.page.html'
})
export class GroceryNewPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof AFinderPage
   */
  public headerModel: HeaderModel;

  /**
   * Grocery list name.
   *
   * @type {string}
   * @memberof GroceryNewPage
   */
  public groceryListName: string;


  constructor(private toast: ToastProvider, public viewCtrl: ViewController, private groceryProvider: GroceryListProvider) {
    this.headerModel = new HeaderModel("New grocery list", undefined, true, undefined,
      new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.CLOSE.toString()));
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
   *  Create new grocery list.
   *
   * @memberof GroceryNewPage
   */
  public createGroceryList() {
    if (GlobalUtils.isEmpty(this.groceryListName)) {
      this.toast.showErrorMessage("Grocery list name cannot be empty!");
    } else {
      let newGroceryList: GroceryList = new GroceryList(this.groceryListName, [], new Date().toString());
      this.groceryProvider.createGroceryList(newGroceryList).then((groceryList) => {
        //TODO - set userId for myProducts from local storage
        this.viewCtrl.dismiss(groceryList);
      }).catch(error => {
        console.log("Error while creating grocery list!");
        this.toast.showErrorMessage("Failed to create grocery list.");
      })

    }
  }
}
