import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-operations-form',
  templateUrl: './color-operations-form.component.html',
  styleUrls: ['./color-operations-form.component.css']
})
export class ColorOperationsFormComponent implements OnInit {
  colorOperationsForm: FormGroup;
  allColors: Color[] = []
  editModeOn: boolean = false;
  selectedColor: Color;

  constructor(private formBuilder: FormBuilder,
              private colorService: ColorService) {
    this.createColorOperationsForm();
  }

  ngOnInit(): void {
    this.fillTable();
  }

  createColorOperationsForm() {
    this.colorOperationsForm = this.formBuilder.group({
      colorName: [""]
    })
  }

  save() {
    if (this.editModeOn) {
      this.selectedColor.colorName = this.colorOperationsForm.controls['colorName'].value;
      console.log(this.selectedColor);
      
      this.colorService.updateColor(this.selectedColor).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm();
      })
    } else {
      this.selectedColor = this.colorOperationsForm.value;
      console.log(this.selectedColor);
      
      this.colorService.addColor(this.selectedColor).subscribe(result => {
        console.log(result);
        this.fillTable();
        this.clearForm()
      })
    }
  }

  loadToForm(color: Color) {
    this.selectedColor = color;
    this.editModeOn = true;
    this.colorOperationsForm.controls['colorName'].setValue(color.colorName);
    console.log(this.selectedColor);
  }

  clearForm() {
    this.editModeOn = false;
    this.colorOperationsForm.controls['colorName'].setValue("");
  }

  fillTable() {
    this.colorService.getColors().subscribe(result => {
      this.allColors = result.data;
    })
  }

  deleteColor() {
    console.log(this.selectedColor);
    
    this.colorService.deleteColor(this.selectedColor).subscribe(result => {
      console.log(result);
      this.fillTable();
      this.clearForm();
    })
  }
}
