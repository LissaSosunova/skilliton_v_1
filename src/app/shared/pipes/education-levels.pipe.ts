import { Pipe, PipeTransform } from '@angular/core';
import { education } from '../constants/education-types';
import * as _ from 'lodash';

@Pipe({
  name: 'educationLevels'
})
export class EducationLevelsPipe implements PipeTransform {

  education = education;
  transform(value: any): any {
    const val = _.find(education, { 'value': value});
    return val.name;
  }

}
