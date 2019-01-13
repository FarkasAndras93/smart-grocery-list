import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_TYPES, Product } from '../../model/backend/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { MyProduct } from '../../model/backend/product/my-product';
import { MyProductFirebase } from '../../model/backend/product/my-product-firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { StorageProvider } from '../tehnical/storage/storage.provider';
import {RequestOptions, Request, Headers } from '@angular/http';
import { GroceryProduct } from '../../model/backend/product/grocery-product';

@Injectable()
export class ProductProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  private sensorUrl = 'http://192.168.0.105:8888';

  private products: Product[];
  private myProducts: MyProduct[];
  private myProductsF: MyProductFirebase[];
  private productsObservables: Observable<any>;
  private myProductObservables: Observable<any>;

  constructor(public http: HttpClient, private fdb: AngularFireDatabase, private storage: StorageProvider) {

    let productsObservables: Observable<any>;
    let myProductObservables: Observable<any>;

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

    myProductObservables.forEach(mp => {
      this.myProductsF = mp;
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
      console.log(this.storage.getLoggedUser().id);
      console.log("....");
      if (myProdf.userId == this.storage.getLoggedUser().id) {
        let p: Product;
        this.products.forEach(productt => {
          if (productt.id == myProdf.productId) {
            p = productt;
            console.log(p);
          }
        })
        // await GlobalUtils.asyncForEach(this.products, async(productt:any) =>{
        //   if(productt.id == myProdf.productId){
        //     p=productt;
        //     console.log(p);
        //   }
        //});
        let mp: MyProduct = new MyProduct(p.name, p.type, myProdf.weight, p.id);
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
    // return new Promise<MyProduct[]>((resolve, reject) => {
    //   this.fdb.list("MyProduct").valueChanges().subscribe((products: MyProductFirebase[]) => {
    //     let myProducts: MyProductFirebase[] = products.filter(product => product.userId == this.storage.getLoggedUser().id);
    //     this.fdb.list("Product").valueChanges().subscribe((baseProducts: Product[]) => {
    //       let returnMyProduct: MyProduct[] = [];
    //       myProducts.forEach(myProduct => {
    //         let tempProduct = baseProducts.filter(baseProduct => baseProduct.id == myProduct.productId)[0];
    //         returnMyProduct.push(new MyProduct(tempProduct.name, tempProduct.type, myProduct.weight)); //TODO - myProduct firebase key-t hozzaadni
    //       });
    //       resolve(returnMyProduct);
    //     });
    //   }, error => {
    //     reject(error);
    //   });
    // });
    return [];
    // console.log("return promise");
    // return Promise.resolve(this.myProducts);

  }

  /**
   * Method to get product for name.
   *
   * @param {string} productName
   * @returns {Promise<Product>}
   * @memberof ProductProvider
   */
  async getProductForName(productName: string): Promise<MyProduct> {
    // return this.http.get(this.apiUrl + "/name/product").toPromise();
    let p: MyProduct;
    await GlobalUtils.asyncForEach(this.products, async (product: Product) => {
      if (product.name == productName) {
        p = new MyProduct(product.name, product.type, 0);
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
    return new Promise((resolve, reject) => {
      this.http.get(this.sensorUrl + "/weight").subscribe((result: any) => {
        resolve(Math.round(result.weight));
      }, error => {
        console.error("Error while getting the value from sensor", error);
      });
    });
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
      new Product(1, "Salami", PRODUCT_TYPES.MEATS),
      new Product(2, "Milk", PRODUCT_TYPES.DAIRY_PRODUCT),
      new Product(3, "Butter", PRODUCT_TYPES.DAIRY_PRODUCT),
      new Product(4, "Bread", PRODUCT_TYPES.GRAIN_PARTIES)
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
    let firebaseMyProduct: MyProductFirebase
      = new MyProductFirebase(product.id, null, this.storage.getLoggedUser().id, product.weight);
    this.fdb.list("MyProduct").push(firebaseMyProduct);
    return Promise.resolve(product);
  }

  /**
   * Method to create product in database.
   *
   * @param {Product} product
   * @returns {Promise<Product>}
   * @memberof ProductProvider
   */
  createProductInDatabase(product: Product): Promise<Product> {

    product.id = GlobalUtils.getRandomNumberBetween(5, 999999999);
    return Promise.resolve(product);
  }

}
