import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseForLogin } from 'src/app/models/auth/responseForLogin';
import { UserForLogin } from 'src/app/models/auth/userForLogin';
import { UserForRegister } from 'src/app/models/auth/userForRegister';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'https://localhost:7104/api/Auth/';

  constructor(private httpClient: HttpClient) { }

  login(userForLogin: UserForLogin):Observable<SingleResponseModel<ResponseForLogin>> {
    let newUrl = this.apiUrl + "login"
    return this.httpClient.post<SingleResponseModel<ResponseForLogin>>(newUrl, userForLogin);
  }

  register(userForRegister: UserForRegister):Observable<SingleResponseModel<UserForRegister>> {
    let newUrl = this.apiUrl + "register"
    return this.httpClient.post<SingleResponseModel<UserForRegister>>(newUrl, userForRegister);
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  hasAuthorization(claim: string, claims: string) {
    let allClaims = claims.split(",");
    for (const c of allClaims) {
      if (c === claim) {
        return true;
      }
    }

    return false;
  }
}
