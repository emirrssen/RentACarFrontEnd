import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarForList } from 'src/app/models/car/carForList';
import { Rental } from 'src/app/models/rental/rental';
import { UserForList } from 'src/app/models/user/userForList';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-rental-operations-form',
  templateUrl: './rental-operations-form.component.html',
  styleUrls: ['./rental-operations-form.component.css']
})
export class RentalOperationsFormComponent implements OnInit {
  rentalOperationsForm: FormGroup;
  allRentals: Rental[] = []
  allUsers: UserForList[] = [];
  allCars: CarForList[] = [];
  editModeOn: boolean = false;
  selectedRental: Rental;

  constructor(private formBuilder: FormBuilder,
              private rentalService: RentalService,
              private userService: UserService,
              private carService: CarService,
              private datePipe: DatePipe) {
    this.createRentalOperationsForm();
  }

  ngOnInit(): void {
    this.fillTable()
    this.getCars();
    this.getUsers();
  }

  createRentalOperationsForm() {
    this.rentalOperationsForm = this.formBuilder.group({
      carId: [""],
      userId: [""],
      rentDate: [""],
      returnDate: [null],
    })
  }

  save() {
    if (this.editModeOn) {
      this.selectedRental.carId = this.rentalOperationsForm.controls['carId'].value;
      this.selectedRental.userId = this.rentalOperationsForm.controls['userId'].value;
      this.selectedRental.rentDate = this.rentalOperationsForm.controls['rentDate'].value;
      this.selectedRental.returnDate = this.rentalOperationsForm.controls['returnDate'].value;

      console.log(this.selectedRental);
      
      this.rentalService.updateRental(this.selectedRental).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm();
      })
    } else {
      this.selectedRental = this.rentalOperationsForm.value;
      console.log(this.selectedRental);
      
      this.rentalService.addRental(this.selectedRental).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm();
      })
    }
  }

  loadToForm(rental: Rental) {
    this.selectedRental = rental;
    this.editModeOn = true;
    this.rentalOperationsForm.controls['carId'].setValue(rental.carId);
    this.rentalOperationsForm.controls['userId'].setValue(rental.userId);
    this.rentalOperationsForm.controls['rentDate'].setValue(this.datePipe.transform(rental.rentDate, 'yyyy-MM-dd'));
    this.rentalOperationsForm.controls['returnDate'].setValue(this.datePipe.transform(rental.returnDate, 'yyyy-MM-dd'));
    console.log(this.selectedRental);
  }

  clearForm() {
    this.editModeOn = false;
    this.rentalOperationsForm.controls['carId'].setValue("");
    this.rentalOperationsForm.controls['userId'].setValue("");
    this.rentalOperationsForm.controls['rentDate'].setValue("");
    this.rentalOperationsForm.controls['returnDate'].setValue("");
  }

  fillTable() {
    this.rentalService.getRentals().subscribe(result => {
      this.allRentals = result.data;
    })
  }

  deleteRental() {
    this.rentalService.deleteRental(this.selectedRental).subscribe(result => {
      console.log(result);
      this.fillTable();
      this.clearForm();
    })
  }

  getUsers() {
    this.userService.getAll().subscribe(result => {
      this.allUsers = result.data;
      console.log(this.allUsers);
      
    })
  }

  getCars() {
    this.carService.listCars().subscribe(result => {
      this.allCars = result.data;
    })
  }
}
