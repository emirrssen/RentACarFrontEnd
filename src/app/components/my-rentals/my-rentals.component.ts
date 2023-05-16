import { Component } from '@angular/core';
import { CarForList } from 'src/app/models/car/carForList';
import { Rental } from 'src/app/models/rental/rental';
import { RentalForList } from 'src/app/models/rental/rentalForList';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.css']
})
export class MyRentalsComponent {

  allRentals: RentalForList[] = [];

  constructor(private rentalService: RentalService,) {
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRentalByEmail(localStorage.getItem("email")).subscribe(response => {
      this.allRentals = response.data;
    }, errorResponse => {
      console.log(errorResponse.error);
    })
  }
}
