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
    public id: string;

        /**
     * Name of the recipe.
     *
     * @type {string}
     * @memberof Recipe
     */
    public name: string;

        /**
     * Id of the recipe.
     *
     * @type {number}
     * @memberof Recipe
     */
    public key: string;

        /**
     * Description of the recipe
     *
     * @type {string}
     * @memberof Recipe
     */
    public description: string;

    /**
     * Id of the user to whom belong the recipe.
     *
     * @type {number}
     * @memberof Recipe
     */
    public userId: string;


    /**
     * Products needed in the recipe.
     *
     * @type {Product[]}
     * @memberof Recipe
     */
    public products: MyProduct[];



    /**
     * Recipe notes.
     *
     * @type {RecipeNote}
     * @memberof Recipe
     */
    public notes: RecipeNote[];


    constructor(id:string,name: string,key:string, products: MyProduct[], description: string, notes: RecipeNote[], userId: string) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.products = products;
        this.description = description;
        this.notes = GlobalUtils.isArrayNotNull(notes);
        this.userId = userId;
        
    }
}