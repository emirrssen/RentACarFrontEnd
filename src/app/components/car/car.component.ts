import { ReturnStatement } from '@angular/compiler';
import { AfterContentChecked, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CarForList } from 'src/app/models/car/carForList';
import { Filters } from 'src/app/models/filters/filters';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, DoCheck {

  cars:CarForList[] = []
  carsForList: CarForList[] = []
  modelYears: string[] = [];
  currentCar: CarForList;
  @Input() selectedFilters: string[] = [];
  searchText: string = "";
  dataLoaded: boolean = false;

  constructor(private carService:CarService) {}

  ngDoCheck(): void {
    if (this.selectedFilters.length > 0) {
      this.applyFilters(this.selectedFilters, this.cars);
    } else if (this.selectedFilters.length == 0) {
      this.carsForList = this.cars;
    }
  }

  ngOnInit(): void {
    this.listCars();
    this.dataEvent.emit(this.modelYears);
  }

  @Output() dataEvent: EventEmitter<any> = new EventEmitter();

  getDetails(car: CarForList) {
    this.currentCar = car;
  }

  listCars() {
    this.carService.listCars().subscribe(response => {
      this.carsForList = response.data;
      this.cars = response.data;
      this.getModelYears();
      this.dataLoaded = true;
    })
  }

  getModelYears() {
    for (const car of this.cars) {
        if (!(this.modelYears.includes(car.modelYear))) {
          this.modelYears.push(car.modelYear);
        }
    }
  }

  private applyFilters(filters: string[], cars: CarForList[]) {
    let filteredCars = [];
    let seperatedFilters = this.seperateFilters(filters);

    for (const car of cars) {
      for (const brandFilter of seperatedFilters.brandFilters) {
        for (const colorFilter of seperatedFilters.colorFilters) {
          for (const modelYearFilter of seperatedFilters.modelYearFilters) {
            if (seperatedFilters.brandFilters.length > 0 && 
                seperatedFilters.colorFilters.length > 0 &&
                seperatedFilters.modelYearFilters.length > 0) {
                  if (car.brandName == brandFilter.slice(4, brandFilter.length) 
                      || car.colorName == colorFilter.slice(4, colorFilter.length) 
                      || car.modelYear == modelYearFilter.slice(4, modelYearFilter.length)) {
                    filteredCars.push(car)
                    console.log('1.' + filteredCars);
                    
                  }
            }
          }
        }
      }
    }

    this.carsForList = filteredCars;
  }

  private seperateFilters(filters: string[]): Filters {
    let returnedFilters: Filters = new Filters();

    for (const filter of filters) {
      if (filter.includes('brn_')) {
        returnedFilters.brandFilters.push(filter);
      }

      if (filter.includes('clr_')) {
        returnedFilters.colorFilters.push(filter)
      }

      if (filter.includes('mdl_')) {
        returnedFilters.modelYearFilters.push(filter);
      }
    }

    return returnedFilters;
  }
}

