import { Component, Inject } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HeaderModel, HEADER_COLORS } from '../../model/frontend/common/HeaderModel';
import { ButtonModel } from '../../model/frontend/common/ButtonModel';
import { HEADER_BUTTON_TYPE } from '../../components/simple-app-header/simple-app-header.component';
import { Config } from '../../model/frontend/config/Config';
import { AppConfig, APP_CONFIG_TOKEN } from '../../app/app.config';
import { StorageProvider } from '../../providers/tehnical/storage/storage.provider';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.page.html'
})
export class SettingsPage {

  /**
   * Header model
   *
   * @type {HeaderModel}
   * @memberof BasePage
   */
  public headerModel: HeaderModel;

  /**
   * Configuration object.
   *
   * @type {Config}
   * @memberof SettingsPage
   */
  public config: Config;


  constructor(public navCtrl: NavController, @Inject(APP_CONFIG_TOKEN) private appConfig: AppConfig,
    private storage: StorageProvider) {
    this.headerModel = new HeaderModel("Settings", HEADER_COLORS.BASE, true, new ButtonModel(undefined, undefined, undefined, undefined, HEADER_BUTTON_TYPE.MENU_TOGGLE.toString()));
    this.config = new Config("");
  }

  /**
   * Save config
   * @param key key
   * @param value value
   */
  public setConfig(key: string) {
    this.storage.saveConfig(this.getConfigKey(key), this.config[key]);
  }

  /**
   * Clear
   *
   * @param {string} key
   * @memberof ConfigurationPage
   */
  public clear(key: string) {
    this.storage.clearConfig(this.getConfigKey(key));
  }

  /**
   * Method to get key from appConfig.
   *
   * @param {string} key
   * @returns {string}
   * @memberof SettingsPage
   */
  public getConfigKey(key: string): string {
    if (key == "alias") {
      return this.appConfig.userAlias;
    }
    return "";
  }

}
