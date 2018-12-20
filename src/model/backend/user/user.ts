import { GlobalUtils } from "../../../utils/global-utils";

export class Recipe {

    /**
     * Id of the user.
     *
     * @type {number}
     * @memberof Recipe
     */
    public id: number;

    /**
     * User name.
     *
     * @type {string}
     * @memberof Recipe
     */
    public username: string;

    /**
     * Password of the user.
     *
     * @type {string}
     * @memberof Recipe
     */
    public password: string;


    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}