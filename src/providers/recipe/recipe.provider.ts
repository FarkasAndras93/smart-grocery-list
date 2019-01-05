import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../model/backend/recipe/recipe';
import { PRODUCT_TYPES } from '../../model/backend/product/product';
import { RecipeNote } from '../../model/backend/recipe/recipe-note';
import { MyProduct } from '../../model/backend/product/my-product';
import { GlobalUtils } from '../../utils/global-utils';

@Injectable()
export class RecipeProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  /**
   * Get all recipe for user.
   *
   * @param {number} userId
   * @returns {Promise<Recipe[]>}
   * @memberof RecipeProvider
   */
  getRecipeList(userId: number): Promise<Recipe[]> {
    // return this.http.get(this.apiUrl + "/all/recipe").toPromise();

    let recipeList: Recipe[] = [
      new Recipe("Sandwich", [new MyProduct("Salami", PRODUCT_TYPES.MEATS, 100), new MyProduct("Butter", PRODUCT_TYPES.DAIRY_PRODUCT, 30),
      new MyProduct("Bread", PRODUCT_TYPES.PASTRY, 200)], "Cut two slice from the bread and put the butter on the bread slices. After this you can put the salami slices too.",
        [new RecipeNote("It was delicious.", new Date().toString()), new RecipeNote("Don`t forrget to make more times.", new Date().toString())]),
      new Recipe("Viennese", [], ""),
      new Recipe("Lasagne", [], "")
    ];
    recipeList[0].id = 1;
    recipeList[1].id = 2;
    recipeList[2].id = 3;
    return Promise.resolve(recipeList);
  }

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
  createNote(recipeId: number, note: RecipeNote): Promise<RecipeNote> {
    // return this.http.get(this.apiUrl + "/create/note/recipe").toPromise();

    note.id = GlobalUtils.getRandomNumberBetween(5, 99999999);
    return Promise.resolve(note);
  }

}
