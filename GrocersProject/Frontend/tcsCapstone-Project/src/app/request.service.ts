import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from './request.model';
import { DeployService } from './deploy.service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public http:HttpClient, public deploy:DeployService) { }

  createRequest(request:any){
    this.http.post(this.deploy.deploymentURL+"/request/createRequest", request, {responseType:'text'}).
    subscribe(res => console.log(res), (err) =>console.log(err));
  }

  getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>(this.deploy.deploymentURL+"/request/getAllRequests");
  }

  delete(sender:string, desc:string, type:string){
    return this.http.delete(this.deploy.deploymentURL+`/request/delete/${sender}/${desc}/${type}`, {responseType:"text"});
  }
}
