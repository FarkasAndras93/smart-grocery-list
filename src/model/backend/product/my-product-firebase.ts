import {  MYPRODUCT_TYPE } from "./my-product";
/**
 * My products.
 *
 * @export
 * @class MyProductFirebase
 */
export class MyProductFirebase {

        /**
     * Id of the user to whom belong the product.
     *
     * @type {number}
     * @memberof MyProductFirebase
     */
    public productId: string;

        /**
     * Id of the user to whom belong the product.
     *
     * @type {number}
     * @memberof Recipe
     */
    public recipeId: string;

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
     * @memberof MyProductFirebase
     */
    public weight: number;


    public key:string;

       /**
     * Type of the product.
     *
     * @type {PRODUCT_TYPES}
     * @memberof Product
     */
    public myProductType: MYPRODUCT_TYPE;

    constructor(productId:string,recipeId:string,userId:string, weight: number,myProductType: MYPRODUCT_TYPE) {
        this.productId = productId;
        this.recipeId = recipeId;
        this.userId = userId;
        this.weight = weight;
        this.myProductType = myProductType;
    }
}