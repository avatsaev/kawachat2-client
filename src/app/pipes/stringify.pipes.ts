import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'stringify'})

export class StringifyPipe implements PipeTransform {

  transform(text: any, chars: string = '\\s'): string {
    return  text.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
}
