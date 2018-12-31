import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';
import { RecipeNewPage } from './recipe-new.page';

@NgModule({
  declarations: [
    RecipeNewPage
  ],
  imports: [
    IonicPageModule.forChild(RecipeNewPage),
    SimpleAppHeaderModule
  ],
  exports: [
    RecipeNewPage
  ]
})
export class RecipeNewPageModule {
}
