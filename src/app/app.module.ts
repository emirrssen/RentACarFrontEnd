import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { RentPageComponent } from './components/rent-page/rent-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchPipe } from './pipes/search/search.pipe';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarOperationsFormComponent } from './components/admin/car-operations-form/car-operations-form.component';
import { RentalOperationsFormComponent } from './components/admin/rental-operations-form/rental-operations-form.component';
import { BrandOperationsFormComponent } from './components/admin/brand-operations-form/brand-operations-form.component';
import { ColorOperationsFormComponent } from './components/admin/color-operations-form/color-operations-form.component';
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { MyRentalsComponent } from './components/my-rentals/my-rentals.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    FilterBarComponent,
    RentPageComponent,
    LoginComponent,
    RegisterComponent,
    SearchPipe,
    HomeComponent,
    AdminComponent,
    CarOperationsFormComponent,
    RentalOperationsFormComponent,
    BrandOperationsFormComponent,
    ColorOperationsFormComponent,
    UserOptionsComponent,
    MyRentalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
