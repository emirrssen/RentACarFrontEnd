import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
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
  selectedFilters: string[] = [];

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

  addFilter(filter: string) {
    if (this.selectedFilters.includes(filter)) {
      let indexOfFilter = this.selectedFilters.indexOf(filter);
      this.selectedFilters.splice(indexOfFilter, 1);
    } else {
      this.selectedFilters.push(filter);
    }
    
    this.dataEvent.emit(this.selectedFilters);
  }

  checkIfSelected(obj: string): boolean {
    if (this.selectedFilters.includes(obj)) {
      return true
    }
    return false;
  }
}
