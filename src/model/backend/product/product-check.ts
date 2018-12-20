import { Product } from "./product";

/**
 * Product checked.
 *
 * @export
 * @class ProductCheck
 */
export class ProductCheck {

    /**
     * Id of the product check.
     *
     * @type {number}
     * @memberof ProductCheck
     */
    public id: number;

    /**
     * Product for buy.
     *
     * @type {Product}
     * @memberof ProductCheck
     */
    public product: Product;

    /**
     * Type of the product.
     *
     * @type {boolean}
     * @memberof ProductCheck
     */
    public checked: boolean;

    constructor(product: Product, checked: boolean) {
        this.product = product;
        this.checked = checked;
    }
}