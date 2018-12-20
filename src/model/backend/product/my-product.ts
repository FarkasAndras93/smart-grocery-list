import { Product, PRODUCT_TYPES } from "./product";

/**
 * My products.
 *
 * @export
 * @class MyProduct
 * @extends {Product}
 */
export class MyProduct extends Product{

    /**
     * Id of the user to whom belong the product.
     *
     * @type {number}
     * @memberof Recipe
     */
    public userId: number;

    /**
     * Weight of the product.
     *
     * @type {number}
     * @memberof MyProduct
     */
    public weight: number;

    /**
     * Availability of the product.
     *
     * @type {boolean}
     * @memberof MyProduct
     */
    public available?: boolean;

    constructor(name: string, type: PRODUCT_TYPES, weight: number, available?: boolean) {
        super(name, type);
        this.weight = weight;
        if (available != undefined) {
            this.available = available;
        }
    }
}