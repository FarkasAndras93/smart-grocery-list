import { GroceryProduct } from "../product/grocery-product";
import { GlobalUtils } from "../../../utils/global-utils";

export class GroceryList {

    /**
     * Id of the grocery list.
     *
     * @type {number}
     * @memberof GroceryList
     */
    public id: string;
    
    /**
     * Id of the user to whom belong the grocery list.
     *
     * @type {number}
     * @memberof Recipe
     */
    public userId: number;

    /**
     * Name of the grocery list.
     *
     * @type {string}
     * @memberof GroceryList
     */
    public name: string;

    /**
     * Products in the grocery list.
     *
     * @type {ProductCheck[]}
     * @memberof GroceryList
     */
    public products: GroceryProduct[];

    /**
     * When was the grocery list created.
     *
     * @type {string}
     * @memberof GroceryList
     */
    public date: string;

        /**
     * When was the grocery list created.
     *
     * @type {string}
     * @memberof GroceryList
     */
    public acceptedBy: string;

    constructor(name: string, products: GroceryProduct[], date: string, userId?: number) {
        this.name = name;
        this.products = products;
        this.date = date;
        if (userId > 0 && !GlobalUtils.isUndefinedOrNull(userId)){
            this.userId = userId;
        }
    }
}