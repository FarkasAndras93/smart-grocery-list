import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUtils } from '../../utils/global-utils';
import { GroceryList } from '../../model/backend/grocery-list/grocery-list';
import { Product, PRODUCT_TYPES } from '../../model/backend/product/product';
import { ProductCheck } from '../../model/backend/product/product-check';

@Injectable()
export class GroceryListProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getGroceryLists(): Promise<GroceryList[]> {
    // return this.http.get(this.apiUrl + "/all/product").toPromise();

    let groceryLists: GroceryList[] = [
      new GroceryList("Grocery for christmas", [
        new ProductCheck(new Product("Salami", PRODUCT_TYPES.MEATS), false),
        new ProductCheck(new Product("Butter", PRODUCT_TYPES.DAIRY_PRODUCT), false),
        new ProductCheck(new Product("Milk", PRODUCT_TYPES.DAIRY_PRODUCT), false),
        new ProductCheck(new Product("Pasta", PRODUCT_TYPES.PASTRY), false),
        new ProductCheck(new Product("Bread", PRODUCT_TYPES.GRAIN_PARTIES), false)
      ], new Date().toString()),
      new GroceryList("Grocery for new year", [], new Date().toString()),
      new GroceryList("Grocery for my birthday", [], new Date().toString())
    ];
    console.log(groceryLists);
    return Promise.resolve(groceryLists);
  }

  getProductWeightOnSensor(): Promise<number> {
    // return this.http.get(this.apiUrl + "sensor/product").toPromise();

    return Promise.resolve(GlobalUtils.getRandomNumberBetween(0,2));
  }

}
