import { GlobalUtils } from "../../../utils/global-utils";

/**
 * Config model
 *
 * @export
 * @class Config
 */
export class Config {
  
  /**
   * Alias of user
   *
   * @type {string}
   * @memberof string
   */
  alias: string;

  /**
   * Fridge url.
   *
   * @type {string}
   * @memberof Config
   */
  fridgeUrl: string;


  constructor(alias: string, fridgeUrl?: string) {
    this.alias = alias;
    if (!GlobalUtils.isUndefinedOrNull(fridgeUrl)) {
      this.fridgeUrl = fridgeUrl;
    }
  }
}
