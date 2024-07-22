import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToYesNo',
  standalone: true
})
export class BooleanToYesNoPipe implements PipeTransform {

  transform(value: boolean | undefined): string {
    return value ? 'Yes' : 'No';
  }

}
