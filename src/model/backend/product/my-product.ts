import { Product, PRODUCT_TYPES } from "./product";
import { Identifiers } from "@angular/compiler";

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
    public userId: string;

    /**
     * Weight of the product.
     *
     * @type {number}
     * @memberof MyProduct
     */
    public weight: number;

    constructor(id:number, name: string, type: PRODUCT_TYPES, weight: number) {
        super(id,name, type);
        this.id = id;
        this.weight = weight;
    }
}