import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the WordbreakPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'wordbreak',
})
export class WordbreakPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value.length > 15){
      let s =value.substring(0,15);
      s=s+'...';
      value=s;
      }
      return value;
  }
}
