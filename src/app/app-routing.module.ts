import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentPageComponent } from './components/rent-page/rent-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginGuard } from './guards/login.guard';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { MyRentalsComponent } from './components/my-rentals/my-rentals.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full", },
  {path: "rentpage", component:RentPageComponent},
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "admin", component: AdminComponent, canActivate: [LoginGuard]},
  {path: "useroptions", component: UserOptionsComponent},
  {path: "myrentals", component: MyRentalsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
