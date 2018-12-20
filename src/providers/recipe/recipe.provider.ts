import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../model/backend/recipe/recipe';
import { PRODUCT_TYPES } from '../../model/backend/product/product';
import { RecipeNote } from '../../model/backend/recipe/recipe-note';
import { MyProduct } from '../../model/backend/product/my-product';

@Injectable()
export class RecipeProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getRecipeList(): Promise<Recipe[]> {
    // return this.http.get(this.apiUrl + "/all/product").toPromise();

    let recipeList: Recipe[] = [
      new Recipe("Sandwich", [new MyProduct("Salami", PRODUCT_TYPES.MEATS, 100), new MyProduct("Butter", PRODUCT_TYPES.DAIRY_PRODUCT, 30),
        new MyProduct("Bread", PRODUCT_TYPES.PASTRY, 200)], "Cut two slice from the bread and put the butter on the bread slices. After this you can put the salami slices too.",
        [new RecipeNote("It was delicious.", new Date().toString()), new RecipeNote("Don`t forrget to make more times.", new Date().toString())]),
      new Recipe("Viennese", [], ""),
      new Recipe("Lasagne", [], "")
    ];
    return Promise.resolve(recipeList);
  }

}
