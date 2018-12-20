import { MENU_TITLE } from "../../../app/app.component";

/**
 * Iconed Menu Item Data Model.
 *
 * @export
 * @class IconedMenuItem
 */
export class IconedMenuItem {
  /**
   * Iconed menu item title
   *
   * @type {string}
   * @memberof IconedMenuItem
   */
  title: MENU_TITLE;

  /**
   * Iconed menu item icon
   *
   * @type {string}
   * @memberof IconedMenuItem
   */
  icon?: string;

  /**
   * Item is enabled or not
   *
   * @type {boolean}
   * @memberof IconedMenuItem
   */
  enabled: boolean = true;

  /**
   * Page to open
   *
   * @type {string}
   * @memberof IconedMenuItem
   */
  pageToOpen: string;

  /**
   * Parameter to pass
   *
   * @type {number}
   * @memberof IconedMenuItem
   */
  parameter: number;

  constructor(title: MENU_TITLE, pageToOpen: string, icon?: string, parameter?: number, enabled: boolean = true) {
    this.title = title;
    if (icon) {
      this.icon = icon;
    }
    if (parameter != undefined) {
      this.parameter = parameter;
    }
    this.enabled = enabled;
    this.pageToOpen = pageToOpen;
  }
}
