import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model.user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  signUpUserDetails(mySignUpForm: any){
    this.http.post("http://localhost:9090/user/storeUserDetails", mySignUpForm, {responseType:"text"}).
    subscribe(result=>console.log(result),error=>console.log(error));
  }

  signUserDetailsInfo(userID: any, userPword : any):Observable<User[]>{
    return this.http.get<User[]>("http://localhost:9090/user/userSignIn")
  }

}
