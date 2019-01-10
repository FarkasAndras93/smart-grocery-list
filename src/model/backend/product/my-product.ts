import { Product, PRODUCT_TYPES } from "./product";

/**
 * My products.
 *
 * @export
 * @class MyProduct
 * @extends {Product}
 */
export class MyProduct extends Product {

    /**
     * Id of the user to whom belong the product.
     *
     * @type {number}
     * @memberof Recipe
     */
    public userId: string;

    /**
     * Weight of the product.
     *
     * @type {number}
     * @memberof MyProduct
     */
    public weight: number;

    constructor(name: string, type: PRODUCT_TYPES, weight: number, id?: number) {
        super(id, name, type);
        this.weight = weight;
    }
}