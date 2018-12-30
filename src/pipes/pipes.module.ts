import { NgModule } from '@angular/core';
import { MapTransformatorPipe } from './map-transformator/map-transformator.pipe';
import { CheckedProductsPipe } from './checked-products/checked-products.pipe';
import { FullTextSearchPipe } from './full-text-search/full-text-search.pipe';

@NgModule({
  declarations: [
    MapTransformatorPipe,
    CheckedProductsPipe,
    FullTextSearchPipe
  ],
	imports: [],
	exports: [
    MapTransformatorPipe,
    CheckedProductsPipe,
    FullTextSearchPipe
  ]
})
export class PipesModule {}
