import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { RentalForList } from 'src/app/models/rental/rentalForList';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl: string = 'https://localhost:7104/api/Rentals/';

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + 'getall');
  }

  addRental(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', rental);
  }

  updateRental(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', rental);
  }

  deleteRental(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'delete', rental);
  }

  getRentalByEmail(email: string): Observable<ListResponseModel<RentalForList>> {
    return this.httpClient.get<ListResponseModel<RentalForList>>(this.apiUrl + 'getbyemail', {params: {email}})
  }
}
