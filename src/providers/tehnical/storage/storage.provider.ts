import { Events } from 'ionic-angular';
import { Injectable, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG_TOKEN, prefixLocalstorage } from '../../../app/app.config';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Interface for all available use cases regarding to store the login data.
 *
 * @export
 * @abstract
 * @class StorageProvider
 */
export abstract class StorageProvider {

  /**
   * Saves a key value pair in the local storage
   *
   * @param {string} key
   * @param {string} value
   * @returns {Promise<boolean>}
   *
   * @memberOf StorageImpl
   */
  abstract saveLocal(key: string, value: any): Promise<boolean>;

  /**
   * Returns the value of a given key
   *
   *
   * @param {string} key key
   * @returns {Promise<any>} value
   *
   * @memberOf StorageImpl
   */
  abstract getLocal(key: string): any;

  /**
   * Removes the value under key
   *
   *
   * @param {string} key key
   * @returns {Promise<any>} success
   *
   * @memberOf StorageImpl
   */
  abstract deleteLocal(key: string): Promise<any>;

  abstract saveConfig(key: string, value: any): Promise<any>

  abstract getConfig(key: string): string;
  abstract clearConfig(key: string): string;

  abstract getLoggedUser(): any;

}


/**
 * Handles the storage in LocalStorage.
 *
 * @class StorageProviderLocal
 * @implements {StorageProvider}
 */
@Injectable()
export class StorageProviderLocal extends StorageProvider {

  constructor(private afAuth: AngularFireAuth ,@Inject(APP_CONFIG_TOKEN) private config: AppConfig, private events: Events, @Inject(prefixLocalstorage) private prefix: string) {

    super();

    this.events.subscribe(this.config.loginConfig.logoutEventKey, () => {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)
          && !key.startsWith(prefix + 'config-')) {
          localStorage.removeItem(key);
        }
      });
      this.afAuth.auth.signOut();
    })

  }

  /**
   * Saves the value at the given key
   *
   *
   * @param {string} key key
   * @param {*} value value
   * @returns {Promise<any>} result
   *
   * @memberOf StorageProviderLocal
   */
  saveLocal(key: string, value: any): Promise<any> {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
    return Promise.resolve(value);
  }

  /**
   * Gets the local value identified by the given key
   *
   *
   * @param {string} key key
   * @returns {Promise<any>} result
   *
   * @memberOf StorageProviderLocal
   */
  getLocal(key: string): any {
    return JSON.parse(localStorage.getItem(this.prefix + key));
  }

  /**
   * Removes the value at the given key
   *
   * @param {string} key key
   * @returns {Promise<any>} result
   *
   * @memberOf StorageProviderLocal

   */
  deleteLocal(key: string): Promise<any> {
    return Promise.resolve(localStorage.removeItem(this.prefix + key));
  }

  saveConfig(key: string, value: any): Promise<any> {
    if (typeof value == 'object') {
      this.saveLocal('config-' + key, JSON.stringify(value));
    }
    else {
      this.saveLocal('config-' + key, value);
    }
    return Promise.resolve(value);
  }

  getConfig(key: string): string {
    try {
      return JSON.parse(localStorage.getItem(this.prefix + 'config-' + key));
    }
    catch (e) {
      return localStorage.getItem(this.prefix + 'config' + key);
    }
  }

  clearConfig(key: string): string {
    localStorage.removeItem(this.prefix + 'config-' + key);
    return key;
  }


  /**
   * Method to get logged user from local storage.
   *
   * @memberof StorageProviderLocal
   */
  getLoggedUser(): any {
    return this.getLocal(this.config.loginConfig.loggedInUser);
  }
}

/**
 * Handles the storage to the SecureStorage.
 *
 * @class StorageProviderSecure
 * @implements {StorageProvider}
//  */
// @Injectable()
// export class StorageProviderSecure extends StorageProvider {


//   private currentStorage;

//   constructor( @Inject(APP_CONFIG_TOKEN) private config: AppConfig, private storage: Storage, private secureStorage: SecureStorage) {

//     super();

//   }

//   private init(): Promise<SecureStorageObject> {
//     if (this.currentStorage == undefined) {
//       return this.secureStorage.create('patientenapp_sec_storage');
//     }
//     else {
//       return Promise.resolve(this.currentStorage);
//     }
//   }

//   /**
//    * The instance used to store the data.
//    *
//    * @memberOf StorageProviderSecure
//    */


//   /**
//    * Saves the given logindata and token to storage.
//    *
//    * @param {LoginData} loginData
//    * @param {string} token
//    * @returns {Promise<boolean>} with value true if login is successfully saved.
//    * In other cases the promise is rejected.
//    *
//    * @memberOf StorageProviderSecure
//    */
//   public saveLogin(loginData: LoginData, token: LoginResponseDTO): Promise<boolean> {

//     return new Promise((resolve, reject) => {

//       console.log("Save login in secureStorage");


//       this.init()
//         .then((obj) => {
//           console.log('Storage is ready!');
//           return obj;
//         })
//         .then((obj) => {
//           console.log('RefreshToken saved!');
//           return obj.set(this.config.loginDataKey, JSON.stringify(loginData));
//         })
//         .catch(error => { console.error("Error during save login in secureStorage", error); reject(error); })
//     });

//   }

//   saveConfig(key: string, value: string): Promise<any> {
//     throw new Error("Method not implemented.");
//   }
//   getConfig(key: string): string {
//     throw new Error("Method not implemented.");
//   }
//   clearConfig(key: string): string {
//     throw new Error("Method not implemented.");
//   }
//   /**
//    * Gets the saved logindata from storage.
//    *
//    * @returns {Promise<LoginData>} resolved if the LoginData could be loaded
//    *
//    * @memberOf StorageProviderSecure
//    */
//   public determineLogin(): Promise<LoginData> {

//     return new Promise((resolve, reject) => {

//       this.init().then((obj) => {

//         obj.get(this.config.loginDataKey)
//           .then((result) => {
//             try {

//               let storedLoginData: LoginData = JSON.parse(result);
//               resolve(storedLoginData);

//             } catch (error) {
//               console.error("Error loading login data. Cause:", error);
//               reject(error);
//             }

//           })
//           .catch((result) => { console.error(result); reject(result); })
//       })

//     });
//   }


//   /**
//      * Gets the saved refresh token from storage.
//      *
//      * @returns {Promise<string>} resolved if the refresh token could be loaded
//      *
//      * @memberOf StorageProviderSecure
//      */
//   determineRefreshToken(): Promise<string> {
//     return new Promise((resolve, reject) => {
//       this.init().then((obj) => {
//         obj.get(this.config.refreshToken)
//           .then((result) => resolve(result))
//           .catch((result) => { console.error(result); reject(result); })
//       });
//     });
//   }

//   /**
//    * Saves the value at the given key
//    *
//    *
//    * @param {string} key key
//    * @param {*} value value
//    * @returns {Promise<any>} result
//    *
//    * @memberOf StorageProviderLocal
//    */
//   saveLocal(key: string, value: any): Promise<any> {
//     return this.storage.set(key, value);
//   }

//   /**
//    * Gets the local value identified by the given key
//    *
//    *
//    * @param {string} key key
//    * @returns {Promise<any>} result
//    *
//    * @memberOf StorageProviderLocal
//    */
//   getLocal(key: string): Promise<any> {
//     return this.storage.get(key);
//   }

//   /**
//    * Removes the value at the given key
//    *
//    * @param {string} key key
//    * @returns {Promise<any>} result
//    *
//    * @memberOf StorageProviderLocal

//    */
//   deleteLocal(key: string): Promise<any> {
//     return this.storage.remove(key);
//   }

// }
