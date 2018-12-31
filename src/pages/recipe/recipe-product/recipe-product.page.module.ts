import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';
import { RecipeProductPage } from './recipe-product.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    RecipeProductPage
  ],
  imports: [
    IonicPageModule.forChild(RecipeProductPage),
    SimpleAppHeaderModule,
    PipesModule
  ],
  exports: [
    RecipeProductPage
  ]
})
export class RecipeNewPageModule {
}
