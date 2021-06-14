import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString',
})
export class CutStringPipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    return value.slice(0, limit) + '...';
  }
}
