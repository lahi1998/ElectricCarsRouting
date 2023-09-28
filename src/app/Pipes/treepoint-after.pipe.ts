import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'treepointAfter'
})
export class TreepointAfterPipe implements PipeTransform {

  transform(value: number): string {
    // If it's a number, round it to 3 decimal places
    if (!isNaN(value)) {
      var stringreturn;
      var stringWithPeriods = "";

      stringreturn = value.toFixed(3).toString();
      for (var i = 0; i < stringreturn.length; i++) {
        if (stringreturn[i] == ",") {
          stringWithPeriods += ".";
        } else {
          stringWithPeriods += stringreturn[i];
        }
      }

      return stringWithPeriods;
    }

    else {
      return "error";
    }
  }

}
