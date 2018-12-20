import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_TYPES } from '../../model/backend/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { MyProduct } from '../../model/backend/product/my-product';

@Injectable()
export class ProductProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getProductsInFrigider(): Promise<MyProduct[]> {
    // return this.http.get(this.apiUrl + "/all/product").toPromise();

    let products: MyProduct[] = [
      new MyProduct("cheese", PRODUCT_TYPES.DAIRY_PRODUCT, 200),
      new MyProduct("potato", PRODUCT_TYPES.VEGETABLE, 1000),
      new MyProduct("ham", PRODUCT_TYPES.MEATS, 400),
      new MyProduct("tomato", PRODUCT_TYPES.VEGETABLE, 300)
    ];
    return Promise.resolve(products);
  }

  getProductWeightOnSensor(): Promise<number> {
    // return this.http.get(this.apiUrl + "sensor/product").toPromise();

    return Promise.resolve(GlobalUtils.getRandomNumberBetween(0,2));
  }

}
