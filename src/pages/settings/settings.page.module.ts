import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings.page';
import { SimpleAppHeaderModule } from '../../components/simple-app-header/simple-app-header.module';
import { IconedMenuItemModule } from '../../components/iconed-menu-item/iconed-menu-item.component.module';

@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    SimpleAppHeaderModule,
    IconedMenuItemModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
