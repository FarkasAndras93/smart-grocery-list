

export class ButtonModel {

    /**
     * Text label of the button.
     * 
     * @type {string}
     * @memberof ButtonModel
     */
    text: string;

    /**
     * Value of the button.
     * 
     * @type {string}
     * @memberof ButtonModel
     */
    value: string;

    /**
     * Background color of button.
     * 
     * @type {string}
     * @memberof ButtonModel
     */
    bgColor: string;

    /**
     * Button is inactive or active.
     * 
     * @type {boolean}
     * @memberof ButtonModel
     */
    inactive: boolean;

    /**
     * Custom type of the button.
     * 
     * @type {string}
     * @memberof ButtonModel
     */
    type: string;

    constructor(text: string, value?: string, bgColor?: string, inactive?: boolean, type?: string) {
        this.text = text;
        if (value) {
            this.value = value;
        }
        if (bgColor) {
            this.bgColor = bgColor;
        }
        if (inactive != undefined) {
            this.inactive = inactive;
        }
        if (type) {
            this.type = type;
        }
    }
}