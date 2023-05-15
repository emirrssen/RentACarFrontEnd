import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand-operations-form',
  templateUrl: './brand-operations-form.component.html',
  styleUrls: ['./brand-operations-form.component.css']
})
export class BrandOperationsFormComponent implements OnInit {
  brandOperationsForm: FormGroup;
  allBrands: Brand[] = []
  editModeOn: boolean = false;
  selectedBrand: Brand;

  constructor(private formBuilder: FormBuilder,
              private brandService: BrandService) {
    this.createBrandOperationsForm();
  }

  ngOnInit(): void {
    this.fillTable();
  }

  createBrandOperationsForm() {
    this.brandOperationsForm = this.formBuilder.group({
      brandName: [""]
    })
  }

  save() {
    if (this.editModeOn) {
      this.selectedBrand.brandName = this.brandOperationsForm.controls['brandName'].value;
      console.log(this.selectedBrand);
      
      this.brandService.updateBrand(this.selectedBrand).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm();
      })
    } else {
      this.selectedBrand = this.brandOperationsForm.value;
      console.log(this.selectedBrand);
      
      this.brandService.addBrand(this.selectedBrand).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm()
      })
    }
  }

  loadToForm(brand: Brand) {
    this.selectedBrand = brand;
    this.editModeOn = true;
    this.brandOperationsForm.controls['brandName'].setValue(brand.brandName);
    console.log(this.selectedBrand);
  }

  clearForm() {
    this.editModeOn = false;
    this.brandOperationsForm.controls['brandName'].setValue("");
  }

  fillTable() {
    this.brandService.getBrands().subscribe(result => {
      this.allBrands = result.data;
    })
  }

  deleteBrand() {
    this.brandService.deleteBrand(this.selectedBrand).subscribe(result => {
      console.log(result);
      this.fillTable();
      this.clearForm();
    })
  }
}
