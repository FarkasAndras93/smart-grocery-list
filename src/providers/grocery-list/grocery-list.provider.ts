import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUtils } from '../../utils/global-utils';
import { GroceryList } from '../../model/backend/grocery-list/grocery-list';
import { PRODUCT_TYPES } from '../../model/backend/product/product';
import { GroceryProduct } from '../../model/backend/product/grocery-product';
import { Product } from '../../model/backend/product/product';
import { MyProduct } from '../../model/backend/product/my-product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GroceryProductFirebase } from '../../model/backend/product/grocery-product-firebase';
import { StorageProvider } from '../tehnical/storage/storage.provider';
import { ProductProvider } from '../product/product.provider';

@Injectable()
export class GroceryListProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient, private fdb: AngularFireDatabase, private storage: StorageProvider, private productProvider: ProductProvider) {
    console.log('Hello RestProvider Provider');
  }

  /**
   * Method to get all grocery list from database for user.
   *
   * @param {number} userId - logged user id
   * @returns {Promise<GroceryList[]>}
   * @memberof GroceryListProvider
   */
  async getGroceryLists(): Promise<GroceryList[]> {
    // return this.http.get(this.apiUrl + "/all/grocery").toPromise();
    let groceryLists: GroceryList[] = [];
    return new Promise<GroceryList[]>((resolve, reject) => {
      // let products: MyProduct[] = [];
      // this.fdb.object("MyProduct").valueChanges().subscribe(p => {
      //   Object.keys(p).forEach(key => {
      //     let prod : MyProduct = p[key];  
      //     products.push(prod);
      //   });
      // });
      // products = products.filter(p => p.myProductType.toString() == "GROCERY");
      let products: MyProduct[];
      this.productProvider.getAllMyProducts().then(result => { products = result });
      let subscribe1 = this.fdb.object("GroceryList").valueChanges().subscribe(gl => {
        let subscribe2 = this.fdb.object("GroceryProduct").valueChanges().subscribe(gp => {
          Object.keys(gl).forEach(key => {
            let groceryList: GroceryList = gl[key];
            let groceryProducts: GroceryProduct[] = [];
            Object.keys(gp).forEach(keyy => {
              let groceryProductFirebase: GroceryProductFirebase = gp[keyy];
              if (groceryProductFirebase.groceryListId == groceryList.id) {

                let prod: MyProduct = products.filter(p => p.myProductId == groceryProductFirebase.myProductId)[0];

                let groceryProduct: GroceryProduct = new GroceryProduct(groceryProductFirebase.id, prod, groceryProductFirebase.checked)
                groceryProducts.push(groceryProduct);
              }
            })
            groceryList.products = groceryProducts;
            console.log(groceryList);
            groceryList.id = key;
            groceryLists.push(groceryList);
            subscribe2.unsubscribe();
          });
          groceryLists = groceryLists.filter(gl => gl.userId == this.storage.getLoggedUser().id);
          groceryLists.forEach(g => console.log(g));
  
          subscribe1.unsubscribe();
          resolve(groceryLists);
        });
      });
    })
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
    return new Promise((resolve, reject) => {
      let idd = GlobalUtils.getRandomNumberBetween(5, 999999999);
      groceryList.id = idd.toString();
      groceryList.userId = this.storage.getLoggedUser().id;
      this.fdb.list("GroceryList").push(groceryList);
      let subscribe1 = this.fdb.object("GroceryList").valueChanges().subscribe(gl => {
        Object.keys(gl).forEach(key => {
          let groceryListR: GroceryList = gl[key];
          if (groceryListR.id == groceryList.id) {
            console.log("hereeee");
            groceryList.id = key;
            this.fdb.object('/GroceryList/' + groceryList.id).update({
              date: groceryList.date, id: groceryList.id, name: groceryList.name, userId: groceryList.userId
            })
          }
        });
        subscribe1.unsubscribe();
        return resolve(groceryList);
      });
    });
  }

  /**
   * Method to delete grocery list.
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ProductProvider
   */
  removeGroceryList(groceryList: GroceryList): Promise<boolean> {
    // return this.http.get(this.apiUrl + "remove/groceryList").toPromise();
    this.fdb.object('/GroceryList/' + groceryList.id).remove();
    let subscribe1 = this.fdb.object("GroceryProduct").valueChanges().subscribe(p => {
      Object.keys(p).forEach(key => {
        let gprodF: GroceryProductFirebase = p[key];
        if (gprodF.groceryListId == groceryList.id) {
          this.fdb.object('/GroceryProduct/' + key).remove();
        }
      })
    })

    subscribe1.unsubscribe();
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
