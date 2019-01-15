import { GlobalUtils } from "../../../utils/global-utils";

export class FirebaseDatabaseUser {

    /**
     * Id of the user.
     *
     * @type {string}
     * @memberof User
     */
    public userId: string;

    /**
     * Flag to know if user is admin.
     *
     * @type {boolean}
     * @memberof User
     */
    public admin: boolean;

    constructor(userId:string, admin:boolean) {
        this.userId = userId;
        this.admin = admin;
    }
}