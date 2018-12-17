export enum PRODUCT_TYPES {
    DAIRY_PRODUCT = 1,
    VEGETABLE = 2,
    MEATS = 3,
    PASTRY = 4
}

export class Product {

    public name: string;

    public type: PRODUCT_TYPES;

    public weight: number;

    constructor(name: string, type: PRODUCT_TYPES, weight: number) {
        this.name = name;
        this.type = type;
        this.weight = weight;
    }
}