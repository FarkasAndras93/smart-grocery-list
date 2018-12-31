import { MyProduct } from "../../backend/product/my-product";
import { PRODUCT_TYPES } from "../../backend/product/product";

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

    constructor(name: string, type: PRODUCT_TYPES, weight: number, checked: boolean) {
        super(name, type, weight);
        this.checked = checked;
    }
}