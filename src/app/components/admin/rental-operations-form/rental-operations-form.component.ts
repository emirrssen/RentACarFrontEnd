import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarForList } from 'src/app/models/car/carForList';
import { CustomerForList } from 'src/app/models/customer/customerForList';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-operations-form',
  templateUrl: './rental-operations-form.component.html',
  styleUrls: ['./rental-operations-form.component.css']
})
export class RentalOperationsFormComponent {
  rentalOperationsForm: FormGroup;
  allRentals: Rental[] = []
  allCustomers: CustomerForList[] = [];
  allCars: CarForList[] = [];
  editModeOn: boolean = false;
  selectedRental: Rental;

  constructor(private formBuilder: FormBuilder,
              private rentalService: RentalService,
              private carService: CarService,
              private customerService: CustomerService) {
    this.createRentalOperationsForm();
  }

  ngOnInit(): void {
    this.fillTable()
    this.getCars();
    this.getCustomers();
  }

  createRentalOperationsForm() {
    this.rentalOperationsForm = this.formBuilder.group({
      carId: [""],
      customerId: [""],
      rentDate: [""],
      returnDate: [null],
    })
  }

  save() {
    if (this.editModeOn) {
      this.selectedRental.carId = this.rentalOperationsForm.controls['carId'].value;
      this.selectedRental.customerId = this.rentalOperationsForm.controls['customerId'].value;
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
    this.rentalOperationsForm.controls['customerId'].setValue(rental.customerId);
    this.rentalOperationsForm.controls['rentDate'].setValue(rental.rentDate);
    this.rentalOperationsForm.controls['returnDate'].setValue(rental.returnDate);
    console.log(this.selectedRental);
  }

  clearForm() {
    this.editModeOn = false;
    this.rentalOperationsForm.controls['carId'].setValue("");
    this.rentalOperationsForm.controls['customerId'].setValue("");
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

  getCustomers() {
    this.customerService.listAllCustomers().subscribe(result => {
      this.allCustomers = result.data;
      console.log(this.allCustomers);
      
    })
  }

  getCars() {
    this.carService.listCars().subscribe(result => {
      this.allCars = result.data;
    })
  }
}
