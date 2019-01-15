
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
    public id: string;
    
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

        /**
     * Text of the note.
     *
     * @type {string}
     * @memberof RecipeNotes
     */
    public recipeId: string;

    constructor(id:string, text: string, date: string,recipeId : string) {
        this.text = text;
        this.date = date;
        this.id = id;
        this.recipeId = recipeId;
    }
}