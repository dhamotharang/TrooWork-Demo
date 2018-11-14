import { Pipe, PipeTransform,Injectable } from '@angular/core';
@Pipe({
  name: 'filterPipe'
})
@Injectable()
export class FilterPipePipe implements PipeTransform {   
  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    return items.filter(it => it[field] == value);
  }
}