import { NgModule } from '@angular/core';
import { MapTransformatorPipe } from './map-transformator/map-transformator.pipe';
import { FullTextSearchPipe } from './full-text-search/full-text-search.pipe';
import { GroceryProductsOrderPipe } from './grocery-products-order/grocery-products-order.pipe';

@NgModule({
  declarations: [
    MapTransformatorPipe,
    FullTextSearchPipe,
    GroceryProductsOrderPipe
  ],
	imports: [],
	exports: [
    MapTransformatorPipe,
    FullTextSearchPipe,
    GroceryProductsOrderPipe
  ]
})
export class PipesModule {}
