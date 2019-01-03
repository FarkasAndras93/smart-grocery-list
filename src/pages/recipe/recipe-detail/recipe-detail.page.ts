import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../../model/frontend/common/HeaderModel';
import { Recipe } from '../../../model/backend/recipe/recipe';
import { RecipeProvider } from '../../../providers/recipe/recipe.provider';
import { RecipeNote } from '../../../model/backend/recipe/recipe-note';
import { GlobalUtils } from '../../../utils/global-utils';
import { ToastProvider } from '../../../providers/tehnical/toast/toast.provider';
import { StorageProvider } from '../../../providers/tehnical/storage/storage.provider';
import { APP_CONFIG_TOKEN, AppConfig } from '../../../app/app.config';

@IonicPage()
@Component({
  selector: 'recipe-detail',
  templateUrl: 'recipe-detail.page.html'
})
export class RecipeDetailPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof RecipeDetailPage
   */
  public headerModel: HeaderModel;

  /**
   * Current recipe
   *
   * @type {Recipe}
   * @memberof RecipeDetailPage
   */
  public recipe: Recipe;

  /**
   * My note message.
   *
   * @type {string}
   * @memberof RecipeDetailPage
   */
  public myNote: string;


  constructor(public navCtrl: NavController, private navParams: NavParams, public recipeProvider: RecipeProvider,
    private toast: ToastProvider, private storage: StorageProvider, @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {
    this.recipe = this.navParams.get("recipe");
    this.headerModel = new HeaderModel(this.recipe.name, HEADER_COLORS.BASE);
  }

  ionViewDidLoad() {
    this.scrollDown();
  }

    /**
   * Method to add my note to task.
   *
   * @memberof TaskDetailsPage
   */
  public async addNote() {
    this.myNote = await this.storage.getConfig(this.config.userAlias) + ":" + this.myNote;
    this.recipeProvider.createNote(this.recipe.id, new RecipeNote(this.myNote, new Date().toString())).then(note => {
      if (GlobalUtils.isUndefinedOrNull(this.recipe.notes)) {
        this.recipe.notes = [];
      }
      this.recipe.notes.push(note);
      this.myNote = "";
      this.scrollDown();
    }).catch(err => {
      console.error("Error while creating recipe note!",  err);
      this.toast.showErrorMessage("Failed to create note!.");
    });
  }

  /**
   * Scroll down in comments list.
   *
   * @private
   * @memberof TaskDetailsPage
   */
  private scrollDown() {
    setTimeout(() => {
      try {
        var itemList = document.getElementById("note-scroll");
        if (!GlobalUtils.isUndefinedOrNull(itemList.getElementsByTagName("ion-item")[0])) {
          itemList.scrollTop = itemList.scrollHeight + itemList.getElementsByTagName("ion-item")[0].scrollHeight;
        }
      }
      catch (e) { };
    }, 250);
  }

}
