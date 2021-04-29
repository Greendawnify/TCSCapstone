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
    this.http.post("http://localhost:9090/request/createRequest", request, {responseType:'text'}).
    subscribe(res => console.log(res), (err) =>console.log(err));
  }

  getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>("http://localhost:9090/request/getAllRequests");
  }

  delete(sender:string, desc:string, type:string){
    return this.http.delete(`http://localhost:9090/request/delete/${sender}/${desc}/${type}`, {responseType:"text"});
  }
}
