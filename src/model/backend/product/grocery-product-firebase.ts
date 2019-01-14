import { Product } from "./product";
import { MyProduct } from "./my-product";

/**
 * Product checked.
 *
 * @export
 * @class GroceryProduct
 */
export class GroceryProductFirebase {

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
    public productId: string;

        /**
     * Product for buy.
     *
     * @type {MyProduct}
     * @memberof GroceryProduct
     */
    public groceryListId: string;

    /**
     * Type of the product.
     *
     * @type {boolean}
     * @memberof GroceryProduct
     */
    public checked: boolean;

    constructor(id: string, productId: string, checked: boolean, groceryListId:string) {
        this.id= id;
        this.productId = productId;
        this.checked = checked;
        this.groceryListId= groceryListId;
    }
}