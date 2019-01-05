import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceryListDetailPage } from './grocery-list-detail.page';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    GroceryListDetailPage
  ],
  imports: [
    IonicPageModule.forChild(GroceryListDetailPage),
    SimpleAppHeaderModule,
    PipesModule
  ],
  exports: [
    GroceryListDetailPage
  ]
})
export class GroceryListDetailPageModule {}
