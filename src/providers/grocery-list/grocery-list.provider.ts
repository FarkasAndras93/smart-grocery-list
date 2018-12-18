import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, PRODUCT_TYPES } from '../../model/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { GroceryList } from '../../model/grocery-list/grocery-list';

@Injectable()
export class GroceryListProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getGroceryLists(): Promise<GroceryList[]> {
    // return this.http.get(this.apiUrl + "/all/product").toPromise();

    let groceryLists: GroceryList[] = [
      new GroceryList("Grocery for christmas", [], new Date().toString()),
      new GroceryList("Grocery for new year", [], new Date().toString()),
      new GroceryList("Grocery for my birthday", [], new Date().toString())
    ];
    return Promise.resolve(groceryLists);
  }

  getProductWeightOnSensor(): Promise<number> {
    // return this.http.get(this.apiUrl + "sensor/product").toPromise();

    return Promise.resolve(GlobalUtils.getRandomNumberBetween(0,2));
  }

}
