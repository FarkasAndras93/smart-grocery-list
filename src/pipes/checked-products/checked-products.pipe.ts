import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'checkedProducts' })
export class CheckedProductsPipe implements PipeTransform {

  /**
   * Returns the rate of the checks.
   * 
   * @param {*} products 
   * @param {any[]} [args] 
   * @returns {string} 
   * @memberof CheckedProductsPipe
   */
  transform(products: any, args?: any[]): string{
    let checked = 0;
    products.forEach((product) => {
      if (product.checked) {
        checked++;
      }
    });
    return products.length + "/" + checked;
  }
}
