import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeployService } from './deploy.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( public http:HttpClient, public deploy:DeployService) { }

  addEmployeeDetails(employeeRef:any){
    this.http.post(this.deploy.deploymentURL+"/employee/storeEmployeeDetails",employeeRef,{responseType:"text"}).
    subscribe(result=>console.log(result),error=>console.log(error));
  }


  deleteEmployeeById(id:any):any {
    return this.http.delete(this.deploy.deploymentURL+"/employee/deleteEmployeeById/"+id, {responseType:"text"});
  }


  updateEmployeePassword(cId:any, newPass:any):any{
    let newObj = {
      cId,
      password : newPass,

    }
    return this.http.put(this.deploy.deploymentURL+"/employee/updateEmployeeByPassword", newObj, {responseType:'text'});
  }

  validateEmpLogin(id:string):Observable<any> {
    return this.http.get<any>(this.deploy.deploymentURL+"/employee/validateEmployee/" + id);
}

}
