import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toolAvailable'
})
export class ToolAvailablePipe implements PipeTransform {
    transform(available) {
        return available ? 'Available' : 'Checked Out';
    }
}

