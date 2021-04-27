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

  signUserDetailsInfo(uIDandpWord: any):Observable<any>{
    return this.http.get<any>("http://localhost:9090/user/userSignIn/"+uIDandpWord.email+"/"+uIDandpWord.pWord);
  }

  updateProfile(profileRef:any){
    return this.http.put("http://localhost:9090/user/editProfile", profileRef, {responseType:'text'})
  }

  checkProperFunds(id:string, cost:number){

    let newobj = {
      id,
      cost
    }

    return this.http.post("http://localhost:9090/user/checkFunds", newobj, {responseType:'text'});

  };

  updateFunds(fundsRef:any){

    return this.http.put("http://localhost:9090/user/updateFunds", fundsRef, {responseType:"text"});
  }

  checkout(cartObj:any){
    return this.http.put("http://localhost:9090/user/checkout", cartObj, {responseType:"text"});
  }


  // For Raise ticket
  unlockUser(id: any){
    let newObj = {
      id
    }
    return this.http.put("http://localhost:9090/user/updateTicket",newObj,{responseType:'text'})
  }

  getRaisedTicket():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:9090/user/getRaisedTickets")
  }
}
