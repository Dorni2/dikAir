import { Pipe, PipeTransform } from '@angular/core';
import { WordsDic } from './words-dic';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'wordCounter'
})
export class WordCounterPipe implements PipeTransform {

  transform(element:WordsDic): string {
    var returnString = "";
  

    returnString += "The word '" + element.word  + "' used " + element.amount + " times.";

    return returnString;
  }

}
