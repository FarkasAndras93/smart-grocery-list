import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFridgePage } from './my-fridge.page';
import { SimpleAppHeaderModule } from '../../../components/simple-app-header/simple-app-header.module';

@NgModule({
  declarations: [
    MyFridgePage
  ],
  imports: [
    IonicPageModule.forChild(MyFridgePage),
    SimpleAppHeaderModule
  ],
  exports: [
    MyFridgePage
  ]
})
export class MyFridgePageModule {}
