import { Product, PRODUCT_TYPES } from "./product";

export enum MYPRODUCT_TYPE {
    FRIDGE = "FRIDGE",
    GROCERY = "GROCERY",
    RECIPE = "RECIPE"
}

/**
 * My products.
 *
 * @export
 * @class MyProduct
 * @extends {Product}
 */
export class MyProduct extends Product {

    public myProductId: string;

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

    /**
     * Type of the product.
     *
     * @type {PRODUCT_TYPES}
     * @memberof Product
     */
    public myProductType: MYPRODUCT_TYPE;

    constructor(name: string, type: PRODUCT_TYPES, weight: number, id:string ,userId: string,myProductId: string ,myProductType: MYPRODUCT_TYPE) {
        super(id, name, type);
        this.weight = weight;
        this.userId = userId;
        this.myProductId = myProductId;
        this.myProductType = myProductType;
    }
}