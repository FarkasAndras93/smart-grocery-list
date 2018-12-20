import { NgModule } from '@angular/core';
import { MapTransformatorPipe } from './map-transformator/map-transformator.pipe';
import { CheckedProductsPipe } from './checked-products/checked-products.pipe';

@NgModule({
  declarations: [
    MapTransformatorPipe,
    CheckedProductsPipe
  ],
	imports: [],
	exports: [
    MapTransformatorPipe,
    CheckedProductsPipe
  ]
})
export class PipesModule {}
