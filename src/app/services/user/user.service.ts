import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { UserForList } from 'src/app/models/user/userForList';
import { UserForUpdate } from 'src/app/models/user/userForUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "https://localhost:7104/api/Users"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<UserForList>> {
    return this.httpClient.get<ListResponseModel<UserForList>>(this.apiUrl + "/getall")
  }

  updateProfile(userForUpdate: UserForUpdate): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", userForUpdate)
  }

  updatePassword(userForUpdate: UserForUpdate, oldPassword: string, newPassword: string): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/updatepassword', userForUpdate, {params: {oldPassword, newPassword}});
  }
}
