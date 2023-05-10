import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from 'src/app/models/car/car';
import { CarForList } from 'src/app/models/car/carForList';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl: string = 'https://localhost:7104/api/Cars/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'getall')
  }

  listCars(): Observable<ListResponseModel<CarForList>> {
    let newUrl = this.apiUrl + 'listall'
    return this.httpClient.get<ListResponseModel<CarForList>>(newUrl)
  }
}

