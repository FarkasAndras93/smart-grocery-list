import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { SimpleAppHeaderComponent } from "./simple-app-header.component";

@NgModule({
  declarations: [
    SimpleAppHeaderComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    SimpleAppHeaderComponent
  ]
})
export class SimpleAppHeaderModule {}
