import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_TYPES, Product } from '../../model/backend/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { MyProduct } from '../../model/backend/product/my-product';

@Injectable()
export class ProductProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
  }

  /**
   * Method to return all product from the fridge.
   *
   * @returns {Promise<MyProduct[]>}
   * @memberof ProductProvider
   */
  getProductsInFrigider(): Promise<MyProduct[]> {
    // return this.http.get(this.apiUrl + "/all/firdge/product").toPromise();

    let products: MyProduct[] = [
      new MyProduct("cheese", PRODUCT_TYPES.DAIRY_PRODUCT, 200),
      new MyProduct("potato", PRODUCT_TYPES.VEGETABLE, 1000),
      new MyProduct("ham", PRODUCT_TYPES.MEATS, 400),
      new MyProduct("tomato", PRODUCT_TYPES.VEGETABLE, 300)
    ];
    return Promise.resolve(products);
  }

  /**
   * Method to return product weight on sensor.
   *
   * @returns {Promise<number>}
   * @memberof ProductProvider
   */
  getProductWeightOnSensor(): Promise<number> {
    // return this.http.get(this.apiUrl + "sensor/product").toPromise();

    return Promise.resolve(GlobalUtils.getRandomNumberBetween(0, 2));
  }

  /**
   * Method to return all product from database.
   *
   * @returns {Promise<Product[]>}
   * @memberof ProductProvider
   */
  getAllProducts(): Promise<Product[]> {
    // return this.http.get(this.apiUrl + "all/product").toPromise();

    let products: Product[] = [
      new Product("Salami", PRODUCT_TYPES.MEATS),
      new Product("Milk", PRODUCT_TYPES.DAIRY_PRODUCT),
      new Product("Butter", PRODUCT_TYPES.DAIRY_PRODUCT),
      new Product("Bread", PRODUCT_TYPES.GRAIN_PARTIES)
    ]
    products[0].id = 1;
    products[1].id = 2;
    products[2].id = 3;
    products[3].id = 4;
    return Promise.resolve(products);
  }

  /**
   * Method to remove product from the fridge.
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ProductProvider
   */
  removeProductFromFridge(id: number): Promise<boolean> {
    // return this.http.get(this.apiUrl + "remove/product").toPromise();

    return Promise.resolve(true);
  }

  /**
   * Method to edit product in the fridge.
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ProductProvider
   */
  editProductInTheFridge(id: number, weight: number): Promise<boolean> {
    // return this.http.get(this.apiUrl + "edit/product").toPromise();

    return Promise.resolve(true);
  }

  /**
   * Method to check product in grocery list.
   *
   * @param {number} id
   * @param {boolean} state
   * @memberof ProductProvider
   */
  checkProductInGrocery(id: number, state: boolean): Promise<boolean> {
    // return this.http.get(this.apiUrl + "check/product").toPromise();

    return Promise.resolve(true);
  }

}
