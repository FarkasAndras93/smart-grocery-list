export enum PRODUCT_TYPES {
    DAIRY_PRODUCT = 1,
    VEGETABLE = 2,
    MEATS = 3,
    PASTRY = 4,
    GRAIN_PARTIES = 5,
    DRINK = 6,
    SWEETS = 7
}

/**
 * Products in general.
 *
 * @export
 * @class Product
 */
export class Product {

    public id: number;

    /**
     * Name of the product.
     *
     * @type {string}
     * @memberof Product
     */
    public name: string;

    /**
     * Type of the product.
     *
     * @type {PRODUCT_TYPES}
     * @memberof Product
     */
    public type: PRODUCT_TYPES;

    constructor(id: number,name: string, type: PRODUCT_TYPES) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}