import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concat } from 'rxjs';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { Filters } from 'src/app/models/filters/filters';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  brands: Brand[] = [];
  colors: Color[] = [];
  @Input() modelYears: string[] = [];
  selectedFilters: Filters = new Filters();
  filtersToDisplay: string[] = [];

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  constructor(private brandService: BrandService, 
              private colorService: ColorService) {

  }

  @Output() dataEvent: EventEmitter<any> = new EventEmitter();

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  concatFilters() {
    this.selectedFilters.brandFilters.splice(0, this.selectedFilters.brandFilters.length);
    this.selectedFilters.colorFilters.splice(0, this.selectedFilters.colorFilters.length);
    this.selectedFilters.modelYearFilters.splice(0, this.selectedFilters.modelYearFilters.length);

    for (const filter of this.filtersToDisplay) {
      if (filter.includes('brd_')) {
        this.selectedFilters.brandFilters.push(filter.slice(4, filter.length));
      }

      if (filter.includes('clr_')) {
        this.selectedFilters.colorFilters.push(filter.slice(4, filter.length));
      }

      if (filter.includes('mdl_')) {
        this.selectedFilters.modelYearFilters.push(filter.slice(4, filter.length));
      }
    }

    this.dataEvent.emit(this.selectedFilters);
  }

  addFilter(filter: string) {
    if (this.filtersToDisplay.includes(filter)) {
      let indexOfFilter = this.filtersToDisplay.indexOf(filter);
      this.filtersToDisplay.splice(indexOfFilter, 1);
    } else {
      this.filtersToDisplay.push(filter);
    }

    this.concatFilters();
  }

  checkIfFilterSelected(filter: string) {
    if (this.filtersToDisplay.includes(filter)) {
      return true;
    } 

    return false;
  }
}
