import { GroceryProduct } from "../product/grocery-product";

export class GroceryList {

    /**
     * Id of the grocery list.
     *
     * @type {number}
     * @memberof GroceryList
     */
    public id: number;
    
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

    public date: string;

    constructor(name: string, products: GroceryProduct[], date: string) {
        this.name = name;
        this.products = products;
        this.date = date;
    }
}