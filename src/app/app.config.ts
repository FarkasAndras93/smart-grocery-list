import { InjectionToken } from '@angular/core';


export interface LoginConfig {
  systemKey: string;
  loginDataKey: string;
  loginUsername: string;
  accessToken: string;
  refreshToken: string;
  updatedTokensAvailableEventKey: string;
  loggedInCompleteEventKey: string;
  logoutEventKey: string;
  hasLoggedIn: string;
}

export interface StatisticConfig {

  statisticSaveEvent: string;
  statisticFilterReadyEvent: string;
  statisticMaxResultsNumber: number;

}

export interface AppConfig {

  loginConfig?: LoginConfig;

  offlineEventKey?: string;
  onlineEventKey?: string;

  basePath?: string;

  configChangedEvent?: string;

  openOrdersStorageKey?: string;

  statisticConfig?: StatisticConfig;

  mediaServerBasePath?: string;

  latestInfoGetTime: string;

  latestInfoDialogShowEvent: string;

  latestInfoDialogCloseEvent: string;

  appName: string;

}

export const DEFAULT_LOGIN_CONFIG: LoginConfig = {
  systemKey: 'test',
  loginDataKey: 'loginData',
  loginUsername: 'loginUsername',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  updatedTokensAvailableEventKey: 'user:loggedIn',
  loggedInCompleteEventKey: 'user:loggedInComplete',
  logoutEventKey: 'system:logout',
  hasLoggedIn: 'hasLoggedIn'

}

export const DEFAULT_STATISTIC_CONFIG: StatisticConfig = {

  statisticSaveEvent: "statistic:saved",
  statisticFilterReadyEvent: "statistic:filterReady",
  statisticMaxResultsNumber: 1464,

}

export const CONFIG_DEFAULT: AppConfig = {

  loginConfig: DEFAULT_LOGIN_CONFIG,

  offlineEventKey: 'system:offline',
  onlineEventKey: 'system:online',

  basePath: 'https://mybackend/path',

  configChangedEvent: 'config:changed',

  openOrdersStorageKey: "OpenOrders",

  statisticConfig: DEFAULT_STATISTIC_CONFIG,

  latestInfoGetTime: "latestInfoGetTime",

  latestInfoDialogShowEvent: "latestInfoDialogShow",

  latestInfoDialogCloseEvent: "latestInfoDialogClose",

  appName: "MyApp",

}

/**
 * The interface for Configurations
 * which can be overwritten by user.
 *
 * @export
 * @interface ConfigKey
 */
export interface ConfigKey {
  storage: string,
  defVal: string,
  primitive?: string
}
/**
 * Determines the used configuration.
 * Returns the user defined configuration from storage if exists.
 * Otherwise the default configuration is returned
 *
 * @export
 * @param {ConfigKey} key
 * @returns {*}
 */
export function dynamicConfig(key: ConfigKey, prefix: string): any {

  console.log("Getting config value for key:", key);
  let result: any;

  if (localStorage.getItem(prefix + key.storage) == null) {
    result = key.defVal;
  }
  else if (key.primitive == 'number') {
    result = Number(localStorage.getItem(prefix + key.storage));
  }
  else if (key.primitive == 'string') {
    result = localStorage.getItem(prefix + key.storage);
  } else {
    result = JSON.parse(localStorage.getItem(prefix + key.storage));

  }

  console.log("Value of ", key, " is ", result);

  return result;

}
/**
 * Function, which determines the request context using the url of the current site. Ignores basepath only adds all additional paths.
 * @returns {string} prefix in the form of e.g. {chefApp-AppPath/SubDirectory/} {chefApp-AppPath/} {chefApp-/}
 */
export function prefixLocalStorageFactory(): string {
  let prefix: string;
  prefix = CONFIG_DEFAULT.appName + "-" + window.location.pathname;
  return prefix;
}

export const prefixLocalstorage = new InjectionToken<string>('prefixLocalstorage');
export let APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('app.config');


export const BACKEND_RES_LOGIN: string = 'user/login';
