import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUtils } from '../../utils/global-utils';
import { GroceryList } from '../../model/grocery-list/grocery-list';
import { Recipe } from '../../model/recipe/recipe';
import { Product, PRODUCT_TYPES } from '../../model/product/product';
import { RecipeNote } from '../../model/recipe/recipe-note';

@Injectable()
export class RecipeProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getRecipeList(): Promise<Recipe[]> {
    // return this.http.get(this.apiUrl + "/all/product").toPromise();

    let recipeList: Recipe[] = [
      new Recipe("Sandwich", [new Product("Salami", PRODUCT_TYPES.MEATS, 100, false), new Product("Butter", PRODUCT_TYPES.DAIRY_PRODUCT, 30, false),
        new Product("Bread", PRODUCT_TYPES.PASTRY, 200, false)], "Cut two slice from the bread and put the butter on the bread slices. After this you can put the salami slices too.",
        [new RecipeNote("It was delicious.", new Date().toString()), new RecipeNote("Don`t forrget to make more times.", new Date().toString())]),
      new Recipe("Viennese", [], ""),
      new Recipe("Lasagne", [], "")
    ];
    return Promise.resolve(recipeList);
  }

}
