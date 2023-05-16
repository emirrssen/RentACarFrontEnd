import { Component, DoCheck, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements DoCheck {

  isAdmin: boolean;
  isLoggedIn: boolean;
  firstName: string

  constructor(private authService: AuthService) {}

  ngDoCheck(): void {
    if (this.isLoggedIn = this.authService.isAuthenticated()) {
      this.firstName = localStorage.getItem("firstName");
      this.isAdmin = this.authService.hasAuthorization("admin", localStorage.getItem("claims"))
    } else {
      this.isAdmin = false;
    }
    
  }

  ngOnInit(): void {
  }

  clearLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("claims");
  }

}
