import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, PRODUCT_TYPES } from '../../model/product/product';

@Injectable()
export class ProductProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getProductsInFrigider(): Promise<Product[]> {
    // return this.http.get(this.apiUrl).toPromise();

    let products: Product[] = [
      new Product("cheese", PRODUCT_TYPES.DAIRY_PRODUCT, 200),
      new Product("potato", PRODUCT_TYPES.VEGETABLE, 1000),
      new Product("ham", PRODUCT_TYPES.MEATS, 400),
      new Product("tomato", PRODUCT_TYPES.VEGETABLE, 300)
    ];
    return Promise.resolve(products);
  }

}
