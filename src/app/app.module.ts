import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { RestProvider } from '../providers/rest/rest';
import { ProductProvider } from '../providers/product/product.provider';
import { ToastProvider } from '../providers/tehnical/toast/toast.provider';
import { GroceryListProvider } from '../providers/grocery-list/grocery-list.provider';
import { RecipeProvider } from '../providers/recipe/recipe.provider';
import { UserProvider } from '../providers/user/user.provider';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
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
    UserProvider
  ]
})
export class AppModule {}
