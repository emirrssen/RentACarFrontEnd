import { Component } from '@angular/core';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.css']
})
export class RentPageComponent {
  returnedModelYears: string[] = [];
  selectedFilters: string[] = [];

  getSelectedFilters(obj: string[]) {
    this.selectedFilters = obj;
  }

  getModelYears(obj: string[]) {
    this.returnedModelYears = obj;
  }
}
