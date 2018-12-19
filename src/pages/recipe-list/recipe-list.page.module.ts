import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeListPage } from './recipe-list.page';
import { SimpleAppHeaderModule } from '../../components/simple-app-header/simple-app-header.module';

@NgModule({
  declarations: [
    RecipeListPage
  ],
  imports: [
    IonicPageModule.forChild(RecipeListPage),
    SimpleAppHeaderModule
  ],
  exports: [
    RecipeListPage
  ]
})
export class RecipeListPageModule {}
