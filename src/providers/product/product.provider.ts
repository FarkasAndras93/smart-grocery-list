import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_TYPES, Product } from '../../model/backend/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { MyProduct } from '../../model/backend/product/my-product';
import { MyProductFirebase } from '../../model/backend/product/my-product-firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {FirebaseObjectObservable} from 'firebase/database'
import { Observable } from 'rxjs';
import { Action } from 'rxjs/scheduler/Action';
import { FirebaseAuth } from 'angularfire2';

@Injectable()
export class ProductProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  private userUid ;

  private products : Product[];
  private myProducts: MyProduct[];
  private  myProductsF :MyProductFirebase[] ;
  private  productsObservables : Observable<any>;
  private myProductObservables : Observable<any>;

  constructor(public http: HttpClient,private afAuth :AngularFireAuth, private fdb: AngularFireDatabase) {
    // return this.http.get(this.apiUrl + "/all/firdge/product").toPromise();
    //let products : Produssct[] ;t
  
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.userUid = data.uid;
        console.log(this.userUid);
      }
      });
    let productsObservables : Observable<any>;
    let myProductObservables : Observable<any>;

    productsObservables = this.fdb.object("Product").valueChanges();
    // productsObservables.forEach( p => {
    //   this.products = p;
    //     console.log("here...");
    //     console.log(this.products);
    // });

    productsObservables.forEach(p => {
      this.products = p;
        console.log("here...");
        console.log(this.products);
    })
    // await GlobalUtils.asyncForEach(productsObservables,async(prodObs:any) =>{
    //     this.products = prodObs;
    //     console.log("here...");
    //     console.log(this.products);
    // });
    myProductObservables = this.fdb.object("MyProduct").valueChanges();
    this.myProductsF = [];

    myProductObservables.forEach(mp =>{
      this.myProductsF=mp;
      console.log(this.myProductsF);
    })
    // await GlobalUtils.asyncForEach(myProductObservables, async(myProd:any) => {
    //   this.myProductsF=myProd;
    //   console.log(this.myProductsF);
    // }) ;
    this.myProducts = [];
    this.myProductsF.forEach(myProdf => {
      console.log("...");
      console.log(myProdf.userId);
      console.log(this.userUid);
      console.log("....");
      if(myProdf.userId == this.userUid){
        let p : Product ;
        this.products.forEach(productt => {
          if(productt.id == myProdf.productId){
            p=productt;
            console.log(p);
          }
        })
        // await GlobalUtils.asyncForEach(this.products, async(productt:any) =>{
        //   if(productt.id == myProdf.productId){
        //     p=productt;
        //     console.log(p);
        //   }
        //});
        let mp : MyProduct = new MyProduct(p.id, p.name, p.type, myProdf.weight);
        console.log(mp);
        this.myProducts.push(mp);
      }
    })
    // await GlobalUtils.asyncForEach(this.myProductsF, async(myProdf:any) =>{
    //   console.log("...");
    //   console.log(myProdf.userId);
    //   console.log(this.userUid);
    //   console.log("....");
    //   if(myProdf.userId == this.userUid){
    //     let p : Product ;
    //     await GlobalUtils.asyncForEach(this.products, async(productt:any) =>{
    //       if(productt.id == myProdf.productId){
    //         p=productt;
    //         console.log(p);
    //       }
    //     });
    //     let mp : MyProduct = new MyProduct(p.id, p.name, p.type, myProdf.weight);
    //     console.log(mp);
    //     this.myProducts.push(mp);
    //   }
    // });
      
  }

  /**
   * Method to return all product from the fridge.
   * @returns {Promise<MyProduct[]>}
   * @memberof ProductProvider
   */
async getProductsInFrigider(): Promise<MyProduct[]> {

    console.log("return promise");
    return Promise.resolve(this.myProducts);
    
  }

  /**
   * Method to get product for name.
   *
   * @param {string} productName
   * @returns {Promise<Product>}
   * @memberof ProductProvider
   */
  async getProductForName(productName: string): Promise<Product> {
    // return this.http.get(this.apiUrl + "/name/product").toPromise();
    let p: Product;
    await GlobalUtils.asyncForEach(this.products, async(product: Product) => {
        if(product.name == productName){
          p = product;
        }
    })
    return Promise.resolve(p);
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
    //return this.http.get(this.apiUrl + "all/product").toPromise();

    let products: Product[] = [
      new Product( 1,"Salami", PRODUCT_TYPES.MEATS),
      new Product(2,"Milk", PRODUCT_TYPES.DAIRY_PRODUCT),
      new Product(3,"Butter", PRODUCT_TYPES.DAIRY_PRODUCT),
      new Product(4,"Bread", PRODUCT_TYPES.GRAIN_PARTIES)
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
  removeProductFromFridge(product: MyProduct): Promise<boolean> {
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

  /**
   * Method to add product in fridge.
   *
   * @param {number} userId
   * @param {MyProduct} product
   * @memberof ProductProvider
   */
  addProductInFridge(product: MyProduct): Promise<MyProduct> {
    // return this.http.get(this.apiUrl + "create/my/product").toPromise();
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.userUid = data.uid;
        console.log(this.userUid);
      }
      });
    //product.id = GlobalUtils.getRandomNumberBetween(5, 9999999);
    let firebaseMyProduct : MyProductFirebase = new MyProductFirebase(product.id,null,this.userUid,product.weight);
    this.fdb.list("MyProduct").push(firebaseMyProduct);
    return Promise.resolve(product);
  }

}
