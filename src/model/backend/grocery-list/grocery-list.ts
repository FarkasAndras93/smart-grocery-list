import { ProductCheck } from "../product/product-check";

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
    public products: ProductCheck[];

    public date: string;

    constructor(name: string, products: ProductCheck[], date: string) {
        this.name = name;
        this.products = products;
        this.date = date;
    }
}