import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUtils } from '../../utils/global-utils';
import { GroceryList } from '../../model/backend/grocery-list/grocery-list';
import { PRODUCT_TYPES } from '../../model/backend/product/product';
import { GroceryProduct } from '../../model/backend/product/grocery-product';
import { MyProduct } from '../../model/backend/product/my-product';

@Injectable()
export class GroceryListProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  /**
   * Method to get all grocery list from database for user.
   *
   * @param {number} userId - logged user id
   * @returns {Promise<GroceryList[]>}
   * @memberof GroceryListProvider
   */
  getGroceryLists(userId: number): Promise<GroceryList[]> {
    // return this.http.get(this.apiUrl + "/all/grocery").toPromise();

    let groceryLists: GroceryList[] = [
      new GroceryList("Grocery for christmas", [
        new GroceryProduct(new MyProduct("Salami", PRODUCT_TYPES.MEATS, 500), false),
        new GroceryProduct(new MyProduct("Butter", PRODUCT_TYPES.DAIRY_PRODUCT, 200), false),
        new GroceryProduct(new MyProduct("Milk", PRODUCT_TYPES.DAIRY_PRODUCT, 1000), false),
        new GroceryProduct(new MyProduct("Pasta", PRODUCT_TYPES.PASTA, 300), false),
        new GroceryProduct(new MyProduct("Bread", PRODUCT_TYPES.GRAIN_PARTIES, 1000), false)
      ], new Date().toString(), undefined, "Andras"),
      new GroceryList("Grocery for new year", [], new Date().toString()),
      new GroceryList("Grocery for my birthday", [], new Date().toString())
    ];
    console.log(groceryLists);
    return Promise.resolve(groceryLists);
  }

  /**
   * Method to create grocery list for user.
   *
   * @param {GroceryList} groceryList
   * @returns {Promise<GroceryList>}
   * @memberof GroceryListProvider
   */
  createGroceryList(groceryList: GroceryList): Promise<GroceryList> {
    // return this.http.get(this.apiUrl + "/create/grocery").toPromise();

    groceryList.id = GlobalUtils.getRandomNumberBetween(5, 999999999);
    return Promise.resolve(groceryList);
  }

  /**
   * Method to delete grocery list.
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ProductProvider
   */
  removeGroceryList(id: number): Promise<boolean> {
    // return this.http.get(this.apiUrl + "remove/groceryList").toPromise();

    return Promise.resolve(true);
  }

  /**
   * Method to update grocery list accepted by property in database.
   *
   * @param {GroceryList} groceryList
   * @returns {Promise<boolean>}
   * @memberof GroceryListProvider
   */
  acceptGroceryList(groceryList: GroceryList): Promise<boolean> {


    return Promise.resolve(true);
  }

}
