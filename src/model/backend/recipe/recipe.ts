import { RecipeNote } from "./recipe-note";
import { GlobalUtils } from "../../../utils/global-utils";
import { MyProduct } from "../product/my-product";

/**
 * Recipe class
 *
 * @export
 * @class Recipe
 */
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
    public products: MyProduct[];

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


    constructor(name: string, products: MyProduct[], description: string, notes?: RecipeNote[], userId?: number) {
        this.name = name;
        this.products = products;
        this.description = description;
        this.notes = GlobalUtils.isArrayNotNull(notes);
        if (userId > 0 && !GlobalUtils.isUndefinedOrNull(userId)) {
            this.userId = userId;
        }
    }
}