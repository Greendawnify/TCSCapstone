import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( public http:HttpClient) { }

  addEmployeeDetails(employeeRef:any){
    this.http.post("http://localhost:9090/employee/storeEmployeeDetails",employeeRef,{responseType:"text"}).
    subscribe(result=>console.log(result),error=>console.log(error));
  }


  deleteEmployeeById(id:any):any {
    return this.http.delete("http://localhost:9090/employee/deleteEmployeeById/"+id, {responseType:"text"});
  }


  updateEmployeePassword(updateUpdateRef:any):any{
    return this.http.put('http://localhost:9090/employee/updateEmployeeByPassword', updateUpdateRef, {responseType:'text'});
  }
}
