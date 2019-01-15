import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductEditorPage } from './product-editor.page';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';

@NgModule({
  declarations: [
    ProductEditorPage
  ],
  imports: [
    IonicPageModule.forChild(ProductEditorPage),
    SimpleAppHeaderModule
  ],
  exports: [
    ProductEditorPage
  ]
})
export class ProductEditorPageModule {}
