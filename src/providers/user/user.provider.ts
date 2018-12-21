import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_TYPES, Product } from '../../model/backend/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { MyProduct } from '../../model/backend/product/my-product';
import { User } from '../../model/backend/user/user';

@Injectable()
export class UserProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  login(username: string, password: string): Promise<User> {
    // return this.http.get(this.apiUrl + "/all/product").toPromise();

    let user: User = new User(username, password);
    user.id = 1;
    return Promise.resolve(user);
  }

  getProductWeightOnSensor(): Promise<number> {
    // return this.http.get(this.apiUrl + "sensor/product").toPromise();

    return Promise.resolve(GlobalUtils.getRandomNumberBetween(0, 2));
  }

  getAllProducts(): Promise<Product[]> {
    // return this.http.get(this.apiUrl + "sensor/product").toPromise();

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

}
