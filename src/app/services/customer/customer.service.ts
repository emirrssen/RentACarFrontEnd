import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerForList } from 'src/app/models/customer/customerForList';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl: string = 'https://localhost:7104/api/Customers/'

  constructor(private httpClient: HttpClient) { }

  listAllCustomers() :Observable<ListResponseModel<CustomerForList>> {
    return this.httpClient.get<ListResponseModel<CustomerForList>>(this.apiUrl + 'listall');
  }
}
