import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';
import { GroceryNewProductPage } from './grocery-new-product.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    GroceryNewProductPage
  ],
  imports: [
    IonicPageModule.forChild(GroceryNewProductPage),
    SimpleAppHeaderModule,
    PipesModule
  ],
  exports: [
    GroceryNewProductPage
  ]
})
export class GroceryNewProductPageModule {
}
