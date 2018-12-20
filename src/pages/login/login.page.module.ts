import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleAppHeaderModule } from '../../components/simple-app-header/simple-app-header.module';
import { LoginPage } from './login.page';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    SimpleAppHeaderModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
