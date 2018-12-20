import { ButtonModel } from "./ButtonModel";

/**
 * Enum which defines possible header colors.
 *
 * @export
 * @enum {number}
 */
export enum HEADER_COLORS {
    BASE = "dark",
}

export class HeaderModel {

    /**
     * Text label of the button.
     * 
     * @type {string}
     * @memberof ButtonModel
     */
    pageTitle: string;

    /**
     * Navigation bar color.
     * 
     * @type {string}
     * @memberof HeaderModel
     */
    navbarColor: string;

    /**
     * Boolean condition to hide default back button or not to hide.
     * 
     * @type {boolean}
     * @memberof HeaderModel
     */
    hideDefaultBackBtn: boolean;

    /**
     * Left button in header.
     * 
     * @type {ButtonModel}
     * @memberof HeaderModel
     */
    leftButton: ButtonModel;

    /**
     * Right button in header.
     * 
     * @type {ButtonModel}
     * @memberof HeaderModel
     */
    rightButton: ButtonModel;

    constructor(pageTitle: string, navbarColor?: string, hideDefaultBackBtn?: boolean, leftButton?: ButtonModel, rightButton?: ButtonModel) {
        this.pageTitle = pageTitle;
        if (navbarColor) {
            this.navbarColor = navbarColor;
        }
        if (hideDefaultBackBtn != undefined) {
            this.hideDefaultBackBtn = hideDefaultBackBtn;
        }
        if (leftButton) {
            this.leftButton = leftButton;
        }
        if (rightButton) {
            this.rightButton = rightButton;
        }
    }
}