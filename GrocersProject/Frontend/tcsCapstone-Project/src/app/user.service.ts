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
    //let tempRes;
    console.log("In User ServiceSignUp: " , mySignUpForm);
    return this.http.post("http://localhost:9090/user/storeUserDetails", mySignUpForm, {responseType:"text"});//.
    //subscribe(result=>{console.log(result); tempRes = result},error=>console.log(error));
    //return tempRes;
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
  raiseTicketService(myTicketForm: any){
    console.log("In User Service: " + myTicketForm);
    return this.http.put("http://localhost:9090/user/updateTicket",myTicketForm,{responseType:'text'});
  }
  unlockUser(id: any){
    let newObj = {
      id
    }
    return this.http.put("http://localhost:9090/user/updateTicket",newObj,{responseType:'text'})
  }

  getRaisedTicket():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:9090/user/getRaisedTickets")
  }

  retrieveUserById(userInitInfo: any):Observable<any>{
    return this.http.get<any>("http://localhost:9090/user/getUser/"+userInitInfo.fName+"/"+userInitInfo.lName+"/"+userInitInfo.email+"/"+userInitInfo.pWord);
  }

  generateUserID(mySignUpForm: any){
    console.log("In User Service genUserID: " , mySignUpForm);
    return this.http.put("http://localhost:9090/user/generateUserID",mySignUpForm,{responseType:'text'})
  }

}
