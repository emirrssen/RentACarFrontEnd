import { Component } from '@angular/core';
import { Filters } from 'src/app/models/filters/filters';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.css']
})
export class RentPageComponent {
  returnedModelYears: string[] = [];
  selectedFilters: Filters = new Filters();

  getSelectedFilters(obj: Filters) {
    this.selectedFilters = obj;
  }

  getModelYears(obj: string[]) {
    this.returnedModelYears = obj;
  }
}
