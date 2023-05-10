import { Pipe, PipeTransform } from '@angular/core';
import { CarForList } from 'src/app/models/car/carForList';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: CarForList[], searchText: string): CarForList[] {
    searchText = searchText?searchText.toLocaleLowerCase():""
    return searchText?value.filter((c: CarForList) => (c.brandName + " " + c.carName).toLocaleLowerCase().indexOf(searchText) !== -1)
    :value;
  }

}
