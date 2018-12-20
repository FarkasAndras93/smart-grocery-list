import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceryListPage } from './grocery-list.page';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    GroceryListPage
  ],
  imports: [
    IonicPageModule.forChild(GroceryListPage),
    SimpleAppHeaderModule,
    PipesModule
  ],
  exports: [
    GroceryListPage
  ]
})
export class GroceryListPageModule {}
