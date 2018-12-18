import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleAppHeaderModule } from '../../components/simple-app-header/simple-app-header.module';
import { ProductNewPage } from './product-new.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductNewPage
  ],
  imports: [
    IonicPageModule.forChild(ProductNewPage),
    SimpleAppHeaderModule,
    PipesModule
  ],
  exports: [
    ProductNewPage
  ]
})
export class ProductNewPageModule {
}
