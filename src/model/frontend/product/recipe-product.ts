import { MyProduct } from "../../backend/product/my-product";
import { PRODUCT_TYPES } from "../../backend/product/product";
import {MYPRODUCT_TYPE} from "../../backend/product/my-product"

/**
 * Recipe products add.
 *
 * @export
 * @class RecipeProduct
 * @extends {MyProduct}
 */
export class RecipeProduct extends MyProduct{

    /**
     * Type of the product.
     *
     * @type {boolean}
     * @memberof GroceryProduct
     */
    public checked: boolean;

    constructor(name: string, type: PRODUCT_TYPES, weight: number,id:string, userId: string, myProductId: string, myProductType: MYPRODUCT_TYPE, checked: boolean, ) {
        super(name, type, weight,id,userId,myProductId,myProductType );
        this.checked = checked;
    }
}