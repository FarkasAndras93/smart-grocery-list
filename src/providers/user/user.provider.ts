import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_TYPES, Product } from '../../model/backend/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { MyProduct } from '../../model/backend/product/my-product';
import { User } from '../../model/backend/user/user';
import { Events } from 'ionic-angular';
import { AppConfig, APP_CONFIG_TOKEN } from '../../app/app.config';
import { StorageProvider } from '../tehnical/storage/storage.provider';

@Injectable()
export class UserProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient, private event: Events, @Inject(APP_CONFIG_TOKEN) private config: AppConfig,
    private storage: StorageProvider) {
    console.log('Hello RestProvider Provider');
  }

  login(username: string, password: string): Promise<User> {
    // return this.http.get(this.apiUrl + "/all/product").toPromise();
    // this.event.publish(this.config.loginConfig.loggedInCompleteEventKey);
    // this.storage.saveLocal(this.config.loginConfig.hasLoggedIn, true);


    //DUMMY
    if (username == "user" && password == "user") {
      let user: User = new User(username, password);
      user.id = 2;
      this.event.publish(this.config.loginConfig.loggedInCompleteEventKey);
      this.storage.saveLocal(this.config.loginConfig.hasLoggedIn, true);
      return Promise.resolve(user);
    } else if (username == "admin" && password == "admin") {
      let user: User = new User(username, password);
      user.id = 1;
      user.admin = true;
      this.event.publish(this.config.loginConfig.loggedInCompleteEventKey);
      this.storage.saveLocal(this.config.loginConfig.hasLoggedIn, true);
      return Promise.resolve(user);
    }
    return Promise.reject("error");
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
