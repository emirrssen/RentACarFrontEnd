import { ReturnStatement } from '@angular/compiler';
import { AfterContentChecked, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CarForList } from 'src/app/models/car/carForList';
import { Filters } from 'src/app/models/filters/filters';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { UserService } from 'src/app/services/user/user.service';

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
  @Input() selectedFilters: Filters;
  searchText: string = "";
  dataLoaded: boolean = false;
  filteredCars: CarForList[] = [];
  rentForm: FormGroup;

  constructor(private carService:CarService,
              private formBuilder: FormBuilder,
              private rentalService: RentalService,
              private userService: UserService) {
                this.createRentForm();
              }

  ngDoCheck(): void {
    if (this.selectedFilters.brandFilters.length > 0 || this.selectedFilters.colorFilters.length > 0 || 
      this.selectedFilters.modelYearFilters.length > 0 || (this.selectedFilters.dailyPriceFilters.maxValue > 0 && this.selectedFilters.dailyPriceFilters.minValue > 0)) {
      this.applyFilters(this.selectedFilters);
    } else if (this.selectedFilters.brandFilters.length === 0 && this.selectedFilters.colorFilters.length === 0 && this.selectedFilters.modelYearFilters.length === 0) {
      this.carsForList = this.cars;
    }

    console.log(this.selectedFilters);
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

  applyFilters(filters: Filters) {
    this.filteredCars = this.cars.filter(car => {
      let brandMatch = false;
      let colorMatch = false;
      let modelYearMatch = false;
      let dailyPriceMatch = false;

      if (filters.brandFilters.length === 0 || filters.brandFilters.includes(car.brandName)) {
        brandMatch = true;
      }

      if(filters.colorFilters.length === 0 || filters.colorFilters.includes(car.colorName)) {
        colorMatch = true;
      }

      if(filters.modelYearFilters.length === 0 || filters.modelYearFilters.includes(car.modelYear)) {
        modelYearMatch = true;
      }

      if((filters.dailyPriceFilters.minValue === 0 && filters.dailyPriceFilters.minValue === 0) ||
         (car.dailyPrice >= filters.dailyPriceFilters.minValue && car.dailyPrice <= filters.dailyPriceFilters.maxValue)) {
        dailyPriceMatch = true;
      }

      return brandMatch && colorMatch && modelYearMatch && dailyPriceMatch;
    })

    this.carsForList = this.filteredCars;
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      carId: [],
      userId: [],
      rentDate: [],
      returnDate: [null]
    })
  }

  rent() {
    let userId: number;
    this.userService.getByMail(localStorage.getItem('email')).subscribe(response => {
      userId = response.data.id
      this.rentForm.controls['carId'].setValue(this.currentCar.carId);
      this.rentForm.controls['userId'].setValue(userId);
      this.rentalService.addRental(this.rentForm.value).subscribe(response => {
        
      });
    })
  }
}

