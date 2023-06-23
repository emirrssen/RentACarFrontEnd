import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/models/auth/userForLogin';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
                this.createRegisterForm()
              }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      password: [""]
    });
  }

  register() {
    let data = this.registerForm.value;

    this.authService.register(data).subscribe(response => {
      console.log(response.message);
      let userForLogin: UserForLogin = {
        email: data.email,
        password: data.password
      }
      this.authService.login(userForLogin).subscribe(response => {
        localStorage.setItem("token", response.data.accessToken.token)
        localStorage.setItem("firstName", response.data.firstName)
        localStorage.setItem("lastName", response.data.lastName)
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("claims", response.data.claims)
        this.router.navigate(["rentpage"])
        console.log(response.message);
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    })
  }
}
