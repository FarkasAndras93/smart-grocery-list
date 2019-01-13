import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUtils } from '../../utils/global-utils';
import { GroceryList } from '../../model/backend/grocery-list/grocery-list';
import { PRODUCT_TYPES } from '../../model/backend/product/product';
import { GroceryProduct } from '../../model/backend/product/grocery-product';
import {  Product } from '../../model/backend/product/product';
import { MyProduct } from '../../model/backend/product/my-product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GroceryProductFirebase } from '../../model/backend/product/grocery-product-firebase';
import { StorageProvider } from '../tehnical/storage/storage.provider';

@Injectable()
export class GroceryListProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient, private fdb: AngularFireDatabase, private storage: StorageProvider) {
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
    let groceryLists: GroceryList[] =[];
    return new Promise<GroceryList[]>((resolve, reject)=>{
      let products: Product[] = [];
      this.fdb.object("Product").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let prod : Product = p[key];  
          products.push(prod);
        });
      });
      this.fdb.object("GroceryList").valueChanges().subscribe(gl => {
        Object.keys(gl).forEach(key =>{
          let groceryList : GroceryList = gl[key];
          let groceryProducts : GroceryProduct[] = [];
           this.fdb.object("GroceryProduct").valueChanges().subscribe(gp => {
             Object.keys(gp).forEach(keyy => {
               let groceryProductFirebase: GroceryProductFirebase = gp[keyy];
               if(groceryProductFirebase.groceryListId == groceryList.id){
                 let prod: Product = products.filter(p => p.id == groceryProductFirebase.productId)[0];
                 let groceryProduct : GroceryProduct = new GroceryProduct(groceryProductFirebase.id,prod, groceryProductFirebase.checked)
                 groceryProducts.push(groceryProduct);
                }
             })
           });
           groceryList.products = groceryProducts;
          groceryLists.push(groceryList);
        })
      });
      groceryLists = groceryLists.filter(gl => gl.userId == this.storage.getLoggedUser().id);
      resolve(groceryLists);
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
    let idd = GlobalUtils.getRandomNumberBetween(5, 999999999);
    groceryList.id = idd.toString();
    groceryList.userId = this.storage.getLoggedUser().id;
    this.fdb.list("GroceryList").push(groceryList);
    this.fdb.object("GroceryList").valueChanges().subscribe(gl => {
      Object.keys(gl).forEach(key =>{
        let groceryListR : GroceryList = gl[key];
        if(groceryListR.id == groceryList.id){
          console.log("hereeee");
          groceryList.id = key;
          this.fdb.object('/GroceryList/' + groceryList.id).update({
            date: groceryList.date, id:groceryList.id, name: groceryList.name, userId:groceryList.userId
          })
        }
      })
    });
    
    return Promise.resolve(groceryList);
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
    this.fdb.object('/GroceryList/'+ groceryList.id).remove();
    this.fdb.object("GroceryProduct").valueChanges().subscribe(p=>{
      Object.keys(p).forEach(key=>{
        let gprodF: GroceryProductFirebase = p[key];
        if(gprodF.groceryListId == groceryList.id){
          this.fdb.object('/GroceryProduct/'+key).remove();
        }
      })
    })
    return Promise.resolve(true);
  }

}
