import { Product } from "../product/product";

export class GroceryList {

    public id: number;
    
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
     * @type {Product[]}
     * @memberof GroceryList
     */
    public products: Product[];

    public date: string;

    constructor(name: string, products: Product[], date: string) {
        this.name = name;
        this.products = products;
        this.date = date;
    }
}