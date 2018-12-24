import { Product } from "./product";

/**
 * Product checked.
 *
 * @export
 * @class GroceryProduct
 */
export class GroceryProduct {

    /**
     * Id of the product check.
     *
     * @type {number}
     * @memberof GroceryProduct
     */
    public id: number;

    /**
     * Product for buy.
     *
     * @type {Product}
     * @memberof GroceryProduct
     */
    public product: Product;

    /**
     * Type of the product.
     *
     * @type {boolean}
     * @memberof GroceryProduct
     */
    public checked: boolean;

    constructor(product: Product, checked: boolean) {
        this.product = product;
        this.checked = checked;
    }
}