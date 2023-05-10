import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseForLogin } from 'src/app/models/auth/responseForLogin';
import { UserForLogin } from 'src/app/models/auth/userForLogin';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'https://localhost:7104/api/Auth/';

  constructor(private httpClient: HttpClient) { }

  login(userForLogin: UserForLogin):Observable<ListResponseModel<ResponseForLogin>> {
    let newUrl = this.apiUrl + "login"
    return this.httpClient.post<ListResponseModel<ResponseForLogin>>(newUrl, userForLogin);
  }
}
