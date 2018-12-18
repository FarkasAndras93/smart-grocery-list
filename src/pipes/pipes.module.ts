import { NgModule } from '@angular/core';
import { MapTransformatorPipe } from './map-transformator/map-transformator.pipe';

@NgModule({
  declarations: [
    MapTransformatorPipe,
  ],
	imports: [],
	exports: [
    MapTransformatorPipe,
  ]
})
export class PipesModule {}
