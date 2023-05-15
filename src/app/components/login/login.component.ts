import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
                this.createLoginForm();
              }

  ngOnInit(): void {
  }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    
    this.authService.login(data).subscribe(response => {
      console.log(response);
      localStorage.setItem("token", response.data.token)
    }, responseError => {
      console.log(responseError.error);
      
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }
}
