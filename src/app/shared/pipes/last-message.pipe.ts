import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'lastMessage',
  pure: false
})
export class LastMessagePipe implements PipeTransform {
  transform(value: any): any {
    if (value !== null) {
      let sliced = value.slice(0, 25);
      let slicedLong = value.slice(0, 300);
      if (sliced.length < value.length) {
      sliced += '...';
      }
      return sliced;
    }
  }

}
