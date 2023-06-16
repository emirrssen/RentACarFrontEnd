import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {}

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
      this.authService.login(data).subscribe(response => {
        
      })
    })
  }
}
