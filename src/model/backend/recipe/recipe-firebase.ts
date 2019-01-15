import { RecipeNote } from "./recipe-note";
import { GlobalUtils } from "../../../utils/global-utils";
import { MyProduct } from "../product/my-product";

/**
 * Recipe class
 *
 * @export
 * @class Recipe
 */
export class RecipeFirebase {

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
    public userId: number;


    constructor(id:string,name: string,key:string, description: string,  userId: number) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.description = description;
        this.userId = userId;
        
    }
}