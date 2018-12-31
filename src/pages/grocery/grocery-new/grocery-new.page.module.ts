import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';
import { GroceryNewPage } from './grocery-new.page';

@NgModule({
  declarations: [
    GroceryNewPage
  ],
  imports: [
    IonicPageModule.forChild(GroceryNewPage),
    SimpleAppHeaderModule
  ],
  exports: [
    GroceryNewPage
  ]
})
export class GroceryNewProductPageModule {
}
