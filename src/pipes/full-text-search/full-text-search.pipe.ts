import { Pipe, PipeTransform } from '@angular/core';
import { GlobalUtils } from '../../utils/global-utils';

@Pipe({
    name: 'fullTextSearch',
    pure: false
})
export class FullTextSearchPipe implements PipeTransform {

    /**
     * Method to search in a list of objects for object property value. Also works if porperty is an array of object and the query need to match
     * one object property from array.
     *
     * @param {*} value - array of object
     * @param {string} query - searched string
     * @param {string} field - object property name
     * @param {string} [subField] - subfield name
     * @param {string} [ownJid] - not the id of object filtered
     * @returns {*} - whole array or the filtered array
     * @memberof FullTextSearchPipe
     */
    transform(value: any, query: string, field: string, subFields?: string, ownJid?: string): any {
        return query ? value.reduce((prev, next) => {
            if (!GlobalUtils.isUndefinedOrNull(subFields)) {
              let attrValue = !GlobalUtils.isUndefinedOrNull(ownJid)? this.attrValue(subFields,next[field].filter(user => user.jid != ownJid)[0]) : this.attrValue(subFields,next[field]);
              if(attrValue.toLowerCase().includes(query.toLowerCase())){
                prev.push(next);
              }
            } else if (GlobalUtils.isUndefinedOrNull(subFields) && next[field].toLowerCase().includes(query.toLowerCase())) {
                prev.push(next);
            }
            return prev;
        }, []) : value;
    }
    private attrValue(dotSeparateField:string,value:any):string{
      let fields:string[] = dotSeparateField.split('.');
      let cnt=0;
      while(!GlobalUtils.isUndefinedOrNull(value[fields[cnt]])&&cnt<fields.length){
        value = value[fields[cnt++]];
      }
      if(fields.length===cnt){
        return value;
      }
      return "";
    }
}
