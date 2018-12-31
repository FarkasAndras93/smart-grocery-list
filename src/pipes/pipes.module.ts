import { NgModule } from '@angular/core';
import { MapTransformatorPipe } from './map-transformator/map-transformator.pipe';
import { FullTextSearchPipe } from './full-text-search/full-text-search.pipe';

@NgModule({
  declarations: [
    MapTransformatorPipe,
    FullTextSearchPipe
  ],
	imports: [],
	exports: [
    MapTransformatorPipe,
    FullTextSearchPipe
  ]
})
export class PipesModule {}
