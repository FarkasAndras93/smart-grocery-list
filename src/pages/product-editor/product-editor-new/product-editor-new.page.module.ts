import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';
import { ProductEditorNewPage } from './product-editor-new.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductEditorNewPage
  ],
  imports: [
    IonicPageModule.forChild(ProductEditorNewPage),
    SimpleAppHeaderModule,
    PipesModule
  ],
  exports: [
    ProductEditorNewPage
  ]
})
export class ProductEditorNewPageModule {
}
