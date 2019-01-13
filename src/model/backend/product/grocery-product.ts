import { Product } from "./product";
import { MyProduct } from "./my-product";

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
    public id: string;

    /**
     * Product for buy.
     *
     * @type {MyProduct}
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

    constructor(id: string, product: Product, checked: boolean) {
        this.id= id;
        this.product = product;
        this.checked = checked;
    }
}