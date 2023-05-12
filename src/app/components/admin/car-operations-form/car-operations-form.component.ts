import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-operations-form',
  templateUrl: './car-operations-form.component.html',
  styleUrls: ['./car-operations-form.component.css']
})
export class CarOperationsFormComponent implements OnInit {
  carOperationsForm: FormGroup;
  allCars: Car[] = []
  allBrands: Brand[] = [];
  allColors: Color[] = [];
  editModeOn: boolean = false;
  selectedCar: Car;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private colorService: ColorService,
              private brandService: BrandService) {
    this.createCarOperationsForm();
  }

  ngOnInit(): void {
    this.fillTable();
    this.getColors();
    this.getBrands();
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
    if (this.editModeOn) {
      this.selectedCar.brandId = this.carOperationsForm.controls['brandid'].value;
      this.selectedCar.colorId = this.carOperationsForm.controls['colorid'].value;
      this.selectedCar.name = this.carOperationsForm.controls['name'].value;
      this.selectedCar.modelYear = this.carOperationsForm.controls['modelyear'].value;
      this.selectedCar.dailyPrice = this.carOperationsForm.controls['dailyprice'].value;

      this.carService.updateCar(this.selectedCar).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm();
      })
    } else {
      this.selectedCar = this.carOperationsForm.value;

      this.carService.addCar(this.selectedCar).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm()
      })
    }
  }

  loadToForm(car: Car) {
    this.selectedCar = car;
    this.editModeOn = true;
    this.carOperationsForm.controls['brandid'].setValue(car.brandId);
    this.carOperationsForm.controls['colorid'].setValue(car.colorId);
    this.carOperationsForm.controls['name'].setValue(car.name);
    this.carOperationsForm.controls['modelyear'].setValue(car.modelYear);
    this.carOperationsForm.controls['dailyprice'].setValue(car.dailyPrice);
    console.log(this.selectedCar);
  }

  clearForm() {
    this.editModeOn = false;
    this.carOperationsForm.controls['brandid'].setValue("");
    this.carOperationsForm.controls['colorid'].setValue("");
    this.carOperationsForm.controls['name'].setValue("");
    this.carOperationsForm.controls['modelyear'].setValue("");
    this.carOperationsForm.controls['dailyprice'].setValue("");
  }

  fillTable() {
    this.carService.getCars().subscribe(result => {
      this.allCars = result.data;
    })
  }

  deleteCar() {
    this.carService.deleteCar(this.selectedCar).subscribe(result => {
      console.log(result);
      this.fillTable();
      this.clearForm();
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(result => {
      this.allColors = result.data;
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(result => {
      this.allBrands = result.data;
    })
  }
}
