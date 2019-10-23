import { Pipe, PipeTransform } from '@angular/core';
import { skillLevel } from '../constants/skill-levels';
import * as _ from 'lodash';
@Pipe({
  name: 'skillLevels',
  pure: false
})
export class SkillLevelsPipe implements PipeTransform {
  skillLevel = skillLevel;
  transform(value: any): any {
    const val = _.find(skillLevel, { 'value': value});
    return val.name;
  }

}
