import { Product } from "../product/product";
import { RecipeNote } from "./recipe-note";
import { GlobalUtils } from "../../../utils/global-utils";

export class Recipe {

    /**
     * Id of the recipe.
     *
     * @type {number}
     * @memberof Recipe
     */
    public id: number;

    /**
     * Id of the user to whom belong the recipe.
     *
     * @type {number}
     * @memberof Recipe
     */
    public userId: number;

    /**
     * Name of the recipe.
     *
     * @type {string}
     * @memberof Recipe
     */
    public name: string;

    /**
     * Products needed in the recipe.
     *
     * @type {Product[]}
     * @memberof Recipe
     */
    public products: Product[];

    /**
     * Description of the recipe
     *
     * @type {string}
     * @memberof Recipe
     */
    public description: string;

    /**
     * Recipe notes.
     *
     * @type {RecipeNote}
     * @memberof Recipe
     */
    public notes: RecipeNote[];


    constructor(name: string, products: Product[], description: string, notes?: RecipeNote[]) {
        this.name = name;
        this.products = products;
        this.description = description;
        this.notes = GlobalUtils.isArrayNotNull(notes);
    }
}