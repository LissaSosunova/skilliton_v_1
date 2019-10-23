import { Pipe, PipeTransform } from '@angular/core';
import { skillShareType } from '../constants/skillShareType';
import * as _ from 'lodash';

@Pipe({
  name: 'pricesTypes',
  pure: false
})
export class PricesTypesPipe implements PipeTransform {
  skillShareType = skillShareType;
  transform(value: any): any {
    const val = _.find(skillShareType, { 'value': value});
    return val.name;
  }

}
