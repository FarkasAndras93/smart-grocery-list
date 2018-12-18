import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapTransformator' })
export class MapTransformatorPipe implements PipeTransform {

  /**
   * Transforms a map list to an object list. Usefull on map iteration with ngFor.
   * 
   * @param {*} value 
   * @param {any[]} [args] 
   * @returns {Object[]} 
   * @memberof MapTransformatorPipe
   */
  transform(value: any, args?: any[]): Object[] {
    let result = [];
    value.forEach((entryVal, entryKey) => {
      result.push({
        key: entryKey,
        val: entryVal
      });
    });
    return result;
  }
}
