import { Component, Input } from '@angular/core';
import { IconedMenuItem } from '../../model/frontend/common/IconedMenuItem';

/**
 * Iconed Menu Item Component
 *
 * @export
 * @class IconedMenuItemComponent
 */
@Component({
  selector: "iconed-menu-item",
  templateUrl: "iconed-menu-item.component.html"
})
export class IconedMenuItemComponent {
  /**
   * Iconed menu item object
   *
   * @type {IconedMenuItem}
   * @memberof IconedMenuItemComponent
   */
  @Input() item: IconedMenuItem;

  constructor() {}
}
