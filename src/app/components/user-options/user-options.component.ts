import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent {

  userInfoForm: FormGroup;
  passwordChangeForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.getUserInfo();
    this.createUserInfoForm();
    this.createPasswordChangeForm();
  }

  createUserInfoForm() {
    this.userInfoForm = this.formBuilder.group({
      email: [this.email],
      firstName: [this.firstName],
      lastName: [this.lastName]
    })
  }

  createPasswordChangeForm() {
    this.passwordChangeForm = this.formBuilder.group( {
      oldPassword: [""],
      newPassword: [""]
    })
  }

  updateProfile() {
    this.userService.updateProfile(this.userInfoForm.value).subscribe(response => {
      localStorage.setItem("firstName", this.userInfoForm.get("firstName").value);
      localStorage.setItem("lastName", this.userInfoForm.get("lastName").value);
      this.getUserInfo();
      this.createUserInfoForm();
    }, errorResponse => {
      console.log(errorResponse.error
      );
    })
  }

  updatePassword() {  
    this.userService.updatePassword(this.userInfoForm.value, 
      this.passwordChangeForm.get("oldPassword").value, 
      this.passwordChangeForm.get("newPassword").value).subscribe(response => {
        console.log(response);
      }, errorResponse => {
        console.log(errorResponse.error);
        
      })
  }

  getUserInfo() {
    this.firstName = localStorage.getItem("firstName")
    this.lastName = localStorage.getItem("lastName")
    this.email = localStorage.getItem("email")
  }
}
