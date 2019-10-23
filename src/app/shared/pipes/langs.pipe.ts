import { Pipe, PipeTransform } from '@angular/core';
import { langs } from '../constants/langs';
import * as _ from 'lodash';

@Pipe({
  name: 'langs',
  pure: false
})
export class LangsPipe implements PipeTransform {
  langs = langs;
  transform(value: any): any {
    const val = _.find(langs, { 'id': value});
    return val.name;
  }

}
