import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './model.employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( public http:HttpClient) { }

  addEmployeeDetails(employeeRef:any){
    return this.http.post("http://localhost:9090/employee/storeEmployeeDetails",employeeRef,{responseType:"text"});
  }


  deleteEmployeeById(id:any):any {
    return this.http.delete("http://localhost:9090/employee/deleteEmployeeById/"+id.id, {responseType:"text"});
  }


  updateEmployeePassword(cId:any, newPass:any):any{
    let newObj = {
      cId,
      password : newPass,

    }
    return this.http.put("http://localhost:9090/employee/updateEmployeeByPassword", newObj, {responseType:'text'});
  }

  validateEmpLogin(id:string):Observable<any> {
    return this.http.get<any>("http://localhost:9090/employee/validateEmployee/" + id);
  }

  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:9090/employee/allEmployeeDetails");
  }

}
