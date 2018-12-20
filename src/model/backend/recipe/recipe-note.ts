
/**
 * Note for the recipe.
 *
 * @export
 * @class RecipeNote
 */
export class RecipeNote {

    /**
     * Id of the recipe.
     *
     * @type {number}
     * @memberof RecipeNote
     */
    public id: number;
    
    /**
     * Text of the note.
     *
     * @type {string}
     * @memberof RecipeNotes
     */
    public text: string;

    /**
     * Description of the recipe
     *
     * @type {string}
     * @memberof RecipeNotes
     */
    public date: string;

    constructor(text: string, date: string) {
        this.text = text;
        this.date = date;
    }
}