import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanizationText',
})
export class HumanizationTextPipe implements PipeTransform {
  transform(value: string): string {
    const safeStr = value.replace(/[~!@_#$%^&*]/g, ' ');
    return `${safeStr[0].toUpperCase()}${safeStr.slice(1).toLowerCase()}`;
  }
}
