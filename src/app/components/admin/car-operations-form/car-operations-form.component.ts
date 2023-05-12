import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-operations-form',
  templateUrl: './car-operations-form.component.html',
  styleUrls: ['./car-operations-form.component.css']
})
export class CarOperationsFormComponent implements OnInit {
  carOperationsForm: FormGroup;
  allCars: Car[] = []

  constructor(private formBuilder: FormBuilder,
              private carService: CarService) {
    this.createCarOperationsForm();
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe(result => {
      this.allCars = result.data;
      console.log(this.allCars);
      
    })
  }

  createCarOperationsForm() {
    this.carOperationsForm = this.formBuilder.group({
      brandid: [""],
      colorid: [""],
      name: [""],
      modelyear: [""],
      dailyprice: [""],
      description: [""]
    })
  }

  save() {
    console.log(this.carOperationsForm.value)
  }

  loadToForm(car: Car) {
    this.carOperationsForm.controls['brandid'].setValue(car.brandId);
    this.carOperationsForm.controls['colorid'].setValue(car.colorId);
    this.carOperationsForm.controls['name'].setValue(car.name);
    this.carOperationsForm.controls['modelyear'].setValue(car.modelYear);
    this.carOperationsForm.controls['dailyprice'].setValue(car.dailyPrice);
  }
}
