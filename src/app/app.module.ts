import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    CarOperationsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
