import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../model/backend/recipe/recipe';
import { PRODUCT_TYPES, Product } from '../../model/backend/product/product';
import { RecipeNote } from '../../model/backend/recipe/recipe-note';
import { MyProduct, MYPRODUCT_TYPE } from '../../model/backend/product/my-product';
import { GlobalUtils } from '../../utils/global-utils';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { StorageProvider } from '../tehnical/storage/storage.provider';
import { RecipeFirebase } from '../../model/backend/recipe/recipe-firebase';
import { MyProductFirebase } from '../../model/backend/product/my-product-firebase';



@Injectable()
export class RecipeProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient,private fdb: AngularFireDatabase, private storage: StorageProvider) {
    console.log('Hello RestProvider Provider');
  }

  /**
   * Get all recipe for user.
   *
   * @param {number} userId
   * @returns {Promise<Recipe[]>}
   * @memberof RecipeProvider
   */
  async getRecipeList(userId: number): Promise<Recipe[]> {
    // return this.http.get(this.apiUrl + "/all/recipe").toPromise();


    return new Promise<Recipe[]>((resolve, reject) => {
      let recipeFirebaseList :RecipeFirebase[] = [];
      let myProducts : MyProduct[]= [];
      let products  : Product[]= [];
      let myProductFirebaseList : MyProductFirebase []=[];
      this.fdb.object("Product").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let prod : Product = p[key];  
          products.push(prod);
        });
      });
      console.log(products);
      this.fdb.object("MyProduct").valueChanges().subscribe(p => {
      Object.keys(p).forEach(key => {
        let mpf : MyProductFirebase = p[key];  
        mpf.key = key;
        myProductFirebaseList.push(mpf);
        let productInstance :Product = products.filter(pr => pr.id == mpf.productId)[0];
        let myProductObjectInstance : MyProduct = new MyProduct(productInstance.name, productInstance.type, mpf.weight, productInstance.id, mpf.userId,mpf.key, mpf.myProductType,mpf.recipeId);
        myProducts.push(myProductObjectInstance);
      });
      console.log(myProducts);
      let notes : RecipeNote[] = [];
      this.fdb.object("RecipeNote").valueChanges().subscribe(rn => {
        Object.keys(rn).forEach(key => {
          let recipeNote : RecipeNote = rn[key];  
          notes.push(recipeNote);
        });
      });
      console.log(notes);
      myProducts= myProducts.filter(mp => mp.userId == this.storage.getLoggedUser().id);
      myProducts = myProducts.filter(mp => mp.myProductType.toString() == "RECIPE");
      console.log(myProducts);
      let recipeListResult : Recipe[] = [];
      this.fdb.object("Recipe").valueChanges().subscribe(p => {
        Object.keys(p).forEach(key => {
          let recipe : RecipeFirebase = p[key]; 
          recipe.key = key; 
          recipe.id = key;
          //console.log(myProducts);
          //console.log(myProducts.filter(mp => mp.recipeId == recipe.id));
          let rec : Recipe = new Recipe(recipe.id, recipe.name, recipe.key, 
                              myProducts.filter(mp => mp.recipeId == recipe.id),recipe.description,notes.filter(n => n.recipeId == recipe.id),this.storage.getLoggedUser().id);
          recipeListResult.push(rec);
        });
      });
      resolve(recipeListResult)
    });
    
  });}

  /**
   * Create recipe for user.
   *
   * @param {Recipe} recipe
   * @returns {Promise<boolean>}
   * @memberof RecipeProvider
   */
  createRecipe(recipe: Recipe): Promise<Recipe> {
    // return this.http.get(this.apiUrl + "/create/recipe").toPromise();

    recipe.id = GlobalUtils.getRandomNumberBetween(4, 99999);
    return Promise.resolve(recipe);
  }

  /**
   * Method to update existent recipe.
   *
   * @param {Recipe} recipe
   * @returns {Promise<Recipe>}
   * @memberof RecipeProvider
   */
  updateRecipe(recipe: Recipe): Promise<Recipe> {
    // return this.http.get(this.apiUrl + "/update/recipe").toPromise();

    return Promise.resolve(recipe);
  }

  /**
   * Method to delete recipe.
   *
   * @param {Recipe} recipe
   * @returns {Promise<Recipe>}
   * @memberof RecipeProvider
   */
  deleteRecipe(recipe: Recipe): Promise<boolean> {
    // return this.http.get(this.apiUrl + "/delete/recipe").toPromise();

    return Promise.resolve(true);
  }

  /**
   * Method to create recipe note.
   *
   * @param {Recipe} recipeId
   * @param {RecipeNote} note
   * @memberof RecipeProvider
   */
  createNote(recipe: Recipe, note: RecipeNote): Promise<RecipeNote> {
    // return this.http.get(this.apiUrl + "/create/note/recipe").toPromise();
    note.id = GlobalUtils.getRandomNumberBetween(5, 999999999).toString();
    //note.date = new Date().toString();
    note.recipeId = recipe.id;
    this.fdb.list("RecipeNote").push(note);
    return Promise.resolve(note);
  }

}
