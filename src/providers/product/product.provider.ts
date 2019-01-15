import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_TYPES, Product } from '../../model/backend/product/product';
import { GlobalUtils } from '../../utils/global-utils';
import { MyProduct, MYPRODUCT_TYPE } from '../../model/backend/product/my-product';
import { GroceryProduct } from '../../model/backend/product/grocery-product';
import { MyProductFirebase } from '../../model/backend/product/my-product-firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { StorageProvider } from '../tehnical/storage/storage.provider';
import { User } from '../../model/backend/user/user';
import { populateNodeData } from 'ionic-angular/umd/components/virtual-scroll/virtual-util';
import { GroceryProductFirebase } from '../../model/backend/product/grocery-product-firebase';
import { GroceryList } from '../../model/backend/grocery-list/grocery-list';

@Injectable()
export class ProductProvider {

  //private apiUrl = 'https://restcountries.eu/rest/v2/all';

  private products: Product[];
  private myProductFirebaseList: MyProductFirebase[];
  private myProducts: MyProduct[];

  constructor(public http: HttpClient, private fdb: AngularFireDatabase, private storage: StorageProvider) {
  }

  /**
   * Method to return all product from the fridge.
   * @returns {Promise<MyProduct[]>}
   * @memberof ProductProvider
   */
  async getProductsInFrigider(): Promise<MyProduct[]> {
    return new Promise<MyProduct[]>((resolve, reject) => {
      this.myProducts = [];
      this.products = [];
      this.myProductFirebaseList = [];
      let subscribe1 = this.fdb.object("Product").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let prod: Product = p[key];
          this.products.push(prod);
        });
      });
      let subscribe2 = this.fdb.object("MyProduct").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let mpf: MyProductFirebase = p[key];
          mpf.key = key;
          this.myProductFirebaseList.push(mpf);
          let productInstance: Product = this.products.filter(pr => pr.id == mpf.productId)[0];
          let myProductObjectInstance: MyProduct = new MyProduct(productInstance.name, productInstance.type, mpf.weight, productInstance.id, mpf.userId, mpf.key, mpf.myProductType, mpf.recipeId);
          this.myProducts.push(myProductObjectInstance);
        });
        this.myProducts = this.myProducts.filter(mp => mp.userId == this.storage.getLoggedUser().id);
        this.myProducts = this.myProducts.filter(mp => mp.myProductType.toString() == "FRIDGE");
        subscribe1.unsubscribe();
        subscribe2.unsubscribe();
        resolve(this.myProducts);
      })

    });
  }

  // console.log("return promise");
  // return Promise.resolve(this.myProducts);



  /**
   * Method to get product for name.    
   *
   * @param {string} productName
   * @returns {Promise<Product>}
   * @memberof ProductProvider
   */
  async getProductForName(productName: string): Promise<Product> {
    // return this.http.get(this.apiUrl + "/name/product").toPromise();
    let pp: Product;
    this.fdb.object("Product").valueChanges().subscribe(p => {
      Object.keys(p).forEach(key => {
        let prod: Product = p[key];
        if (prod.name == productName) {
          return Promise.resolve(prod);
        }
      });
    });
    return Promise.resolve(pp);
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
    return new Promise((resolve, reject) => {
      let productss: Product[] = [];
      let subscribe1 = this.fdb.object("Product").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let prod: Product = p[key];
          productss.push(prod);
        });
        subscribe1.unsubscribe();
        resolve(productss);
      });
    })

    // subscribe1.unsubscribe();
    // return Promise.resolve(productss);
  }

  /**
   * Method to return all product from database.
   *
   * @returns {Promise<Product[]>}
   * @memberof ProductProvider
   */
  getAllMyProducts(): Promise<MyProduct[]> {
    return new Promise<MyProduct[]>((resolve, reject) => {
      this.myProducts = [];
      this.products = [];
      this.myProductFirebaseList = [];
      this.fdb.object("Product").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let prod: Product = p[key];
          this.products.push(prod);
        });
      });
      this.fdb.object("MyProduct").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let mpf: MyProductFirebase = p[key];
          mpf.key = key;
          this.myProductFirebaseList.push(mpf);
          let productInstance: Product = this.products.filter(pr => pr.id == mpf.productId)[0];
          let myProductObjectInstance: MyProduct = new MyProduct(productInstance.name, productInstance.type, mpf.weight, productInstance.id, mpf.userId, mpf.key, mpf.myProductType, mpf.recipeId);
          this.myProducts.push(myProductObjectInstance);
        });
        this.myProducts = this.myProducts.filter(mp => mp.userId == this.storage.getLoggedUser().id);
        resolve(this.myProducts);
      })

    });
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
    this.fdb.object('/MyProduct/' + product.myProductId).remove();
    this.getProductsInFrigider();
    return Promise.resolve(true);
  }

  /**
   * Method to edit product in the fridge.
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ProductProvider
   */
  editProductInTheFridge(myProd: MyProduct, weight: number): Promise<boolean> {
    // return this.http.get(this.apiUrl + "edit/product").toPromise();
    this.fdb.object('/MyProduct/' + myProd.myProductId)
      .update({ productId: myProd.id, userId: myProd.userId, weight: weight, myProductType: myProd.myProductType });
    this.getProductsInFrigider();
    return Promise.resolve(true);
  }

  /**
   * Method to check product in grocery list.
   *
   * @param {number} id
   * @param {boolean} state
   * @memberof ProductProvider
   */
  checkProductInGrocery(groceryproduct: GroceryProduct, state: boolean): Promise<boolean> {
    // return this.http.get(this.apiUrl + "check/product").toPromise();
    console.log(groceryproduct.checked);  // undefined
    this.fdb.object("GroceryProduct").valueChanges().subscribe(p => {
      Object.keys(p).forEach(key => {
        let gprodF: GroceryProductFirebase = p[key];
        if (gprodF.id == groceryproduct.id) {
          this.fdb.object('/GroceryProduct/' + key).update({
            checked: state, groceryListId: gprodF.groceryListId, id: gprodF.id, productId: gprodF.myProductId
          });
        }
      })
    })
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
      = new MyProductFirebase(product.id, null, this.storage.getLoggedUser().id, product.weight, product.myProductType);
    let test = this.fdb.list("MyProduct").push(firebaseMyProduct);
    product.myProductId = test.key;
    return Promise.resolve(product);
  }

  /**
   * Method to create grocery products.
   *
   * @param {GroceryProduct[]} groceryProd
   * @returns {Promise<GroceryProduct[]>}
   * @memberof ProductProvider
   */
  createGroceryProducts(groceryProd: GroceryProduct[], grocerylist: GroceryList): Promise<GroceryProduct[]> {
    groceryProd.forEach(gp => {

      let firebaseMyProduct: MyProductFirebase
        = new MyProductFirebase(gp.myProduct.id, null, this.storage.getLoggedUser().id, gp.myProduct.weight, MYPRODUCT_TYPE.GROCERY);
      let test = this.fdb.list("MyProduct").push(firebaseMyProduct);
      gp.myProduct.myProductId = test.key;

      gp.id = GlobalUtils.getRandomNumberBetween(5, 999999999).toString();
      let gpf: GroceryProductFirebase = new GroceryProductFirebase(gp.id, gp.myProduct.myProductId, gp.checked, grocerylist.id);
      this.fdb.list("GroceryProduct").push(gpf);
      this.fdb.object("GroceryProduct").valueChanges().subscribe(gl => {
        Object.keys(gl).forEach(key => {
          let groceryProductR: GroceryProductFirebase = gl[key];
          if (groceryProductR.id == gpf.id) {
            console.log("hereeee");
            gpf.id = key;
            //let myProdd: MyProduct = new MyProduct();
            this.fdb.object('/GroceryProduct/' + gpf.id).update({
              checked: gpf.checked, groceryListId: gpf.groceryListId, id: gpf.id, myProductId: gpf.myProductId
            })
          }
        })
      });
    })
    return Promise.resolve(groceryProd);
  }

}
