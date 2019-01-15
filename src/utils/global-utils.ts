import { DatePipe } from "@angular/common";

/**
 * Global Utils, contains util method for the whole aplication.
 *
 * @export
 * @class GlobalUtils
 */
export class GlobalUtils {

  constructor() {
  }

  public static isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  /**
   * Checks if value is undefined or null
   *
   * @static
   * @param {any} val
   * @returns true if value is undefined or null, otherwise false
   * @memberof GlobalUtils
   */
  public static isUndefinedOrNull(value: any): boolean {
    return value === undefined || value === null;
  }

  /**
   * Checks if string value is undefined or null or empty
   *
   * @static
   * @param {string} val
   * @returns true if value is undefined or null or empty, otherwise false
   * @memberof GlobalUtils
   */
  public static isEmpty(value: string): boolean {
    return value === undefined || value === null || value === "";
  }

  /**
   * Returns true if the given array has all the values equals to 0
   *
   * @static
   * @param {any[]} array
   * @returns {boolean}
   * @memberof GlobalUtils
   */
  public static isArrayFilledWithValue(array: any[], ...targetValue): boolean {
    return array.every(function (value) {
      return (typeof targetValue === "number" || typeof targetValue === "string"
        ? targetValue == Number(value)
        : typeof targetValue === "object" ? targetValue.indexOf(value) != -1
          : targetValue == value
      );
    });
  }

  /**
   * Search in map by value and retrun key.
   *
   * @static
   * @param {Map<any, any>} map
   * @param {*} value
   * @memberof GlobalUtils
   */
  public static getMapKeyByValue(map: Map<any, any>, value: any) {
    let key = null;
    map.forEach((entryVal, entryKey) => {
      if (entryVal == value) {
        key = entryKey;
      }
    })
    return key;
  }

  /**
   * Method to use async/await with forEach. If this function is used for iteration and there are promises with await inside of iteration then promises are executed
   * first. After the await methods are executed inside of the forEach the execution continues with next lines outside of the forEach.
   *
   * @static
   * @param {any} array
   * @param {any} callback
   * @memberof GlobalUtils
   */
  public static async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  /**
   * Method to get parameter value from url.
   *
   * @static
   * @param {*} parameterName
   * @returns
   * @memberof GlobalUtils
   */
  public static getUrlParameter(parameterName) {
    var result = null, tmp = [];
    location.search.substr(1).split("&").forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) {
        result = decodeURIComponent(tmp[1])
      };
    });
    return result;
  }

  /**
   * Generate a random string with the given length.
   * @param len
   */
  public static generateRandomString(len: number): string {
    let outStr: string = "", newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(36).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
  }
  /**
   * Return object if it is not null or a new empty array if it is
   *
   * @param object
   */
  public static isArrayNotNull(object: any): any[] {
    return object != undefined && object != null ? object : [];
  }

  /**
   * UUID Generator
   *
   * @private
   * @returns
   * @memberof GlobalUtils
   */
  public static getUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  /**
   * Method to convert html text to normal text. Replace specifig html tags and decode.
   *
   * @static
   * @param {*} text
   * @returns
   * @memberof GlobalUtils
   */
  public static htmlToNormalText(text) {
    var parser = new DOMParser;
    var dom = parser.parseFromString(
      '<!doctype html><body>' + text,
      'text/html');
    var decodedString = dom.body.textContent;
    return text ? decodedString : '';
  }
  /**
   * Method to create a JID for XMPP usage.
   * @param tenant
   * @param username
   */
  public static createJidForUser(tenant: string, username: string): string {
    // create a valid JID for xmpp login from the username and tenant.
    let jid: string;
    jid = tenant + '_' + username.toLowerCase().replace(/ /g, '') + '@communication.awinta.net';
    return jid;
  }

  /**
   * Method to get color for string.
   *
   * @static
   * @param {*} str
   * @returns
   * @memberof GlobalUtils
   */
  public static stringToColour(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  /**
   * Method to get random numbers between min and max value.
   *
   * @static
   * @param {number} min
   * @param {number} max
   * @returns
   * @memberof GlobalUtils
   */
  public static getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  public static convertProductObjectToList(products){
    return Object.keys(products).map(i => products[i]);
  }
}
