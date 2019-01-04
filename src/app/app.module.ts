import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import{AngularFireAuthModule} from 'angularfire2/auth';

import { MyApp } from './app.component';
import { RestProvider } from '../providers/rest/rest';
import { ProductProvider } from '../providers/product/product.provider';
import { ToastProvider } from '../providers/tehnical/toast/toast.provider';
import { GroceryListProvider } from '../providers/grocery-list/grocery-list.provider';
import { RecipeProvider } from '../providers/recipe/recipe.provider';
import { UserProvider } from '../providers/user/user.provider';
import { StorageProvider, StorageProviderLocal } from '../providers/tehnical/storage/storage.provider';
import { APP_CONFIG_TOKEN, CONFIG_DEFAULT, prefixLocalstorage, prefixLocalStorageFactory } from './app.config';
import {firebaseconfig} from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    ProductProvider,
    ToastProvider,
    GroceryListProvider,
    RecipeProvider,
    UserProvider,
    { provide: StorageProvider, useClass: StorageProviderLocal },
    { provide: APP_CONFIG_TOKEN, useValue: CONFIG_DEFAULT },
    { provide: prefixLocalstorage, useFactory: prefixLocalStorageFactory },
  ]
})
export class AppModule {}
