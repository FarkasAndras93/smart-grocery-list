import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeDetailPage } from './recipe-detail.page';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';

@NgModule({
  declarations: [
    RecipeDetailPage
  ],
  imports: [
    IonicPageModule.forChild(RecipeDetailPage),
    SimpleAppHeaderModule
  ],
  exports: [
    RecipeDetailPage
  ]
})
export class RecipeDetailPageModule {}
