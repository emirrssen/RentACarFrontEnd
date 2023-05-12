import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Rental } from 'src/app/models/rental/rental';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-operations-form',
  templateUrl: './rental-operations-form.component.html',
  styleUrls: ['./rental-operations-form.component.css']
})
export class RentalOperationsFormComponent {
  rentalOperationsForm: FormGroup;
  allRentals: Rental[] = []
  editModeOn: boolean = false;
  selectedRental: Rental;

  constructor(private formBuilder: FormBuilder,
              private rentalService: RentalService) {
    this.createRentalOperationsForm();
  }

  ngOnInit(): void {
    this.fillTable()
  }

  createRentalOperationsForm() {
    this.rentalOperationsForm = this.formBuilder.group({
      carid: [""],
      customerid: [""],
      rentdate: [""],
      returndate: [""],
    })
  }

  save() {
    if (this.editModeOn) {
      this.selectedRental.carId = this.rentalOperationsForm.controls['carid'].value;
      this.selectedRental.customerId = this.rentalOperationsForm.controls['customerid'].value;
      this.selectedRental.rentDate = this.rentalOperationsForm.controls['rentdate'].value;
      this.selectedRental.returnDate = this.rentalOperationsForm.controls['returndate'].value;

      this.rentalService.updateRental(this.selectedRental).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm();
      })
    } else {
      this.selectedRental = this.rentalOperationsForm.value;

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
    this.rentalOperationsForm.controls['carid'].setValue(rental.carId);
    this.rentalOperationsForm.controls['customerid'].setValue(rental.customerId);
    this.rentalOperationsForm.controls['rentdate'].setValue(rental.rentDate);
    this.rentalOperationsForm.controls['returndate'].setValue(rental.returnDate);
    console.log(this.selectedRental);
  }

  clearForm() {
    this.editModeOn = false;
    this.rentalOperationsForm.controls['carid'].setValue("");
    this.rentalOperationsForm.controls['customerid'].setValue("");
    this.rentalOperationsForm.controls['rentdate'].setValue("");
    this.rentalOperationsForm.controls['returndate'].setValue("");
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
}
