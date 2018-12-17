import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home.page';
import { SimpleAppHeaderModule } from '../../components/simple-app-header/simple-app-header.module';
import { IconedMenuItemModule } from '../../components/iconed-menu-item/iconed-menu-item.component.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SimpleAppHeaderModule,
    IconedMenuItemModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
