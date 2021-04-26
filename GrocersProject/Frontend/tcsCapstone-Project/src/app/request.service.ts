import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from './request.model';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public http:HttpClient) { }

  createRequest(request:any){
    this.http.post("http://localhost:9090/request/createRequest", request, {responseType:'text'}).
    subscribe(res => console.log(res), (err) =>console.log(err));
  }

  getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>("http://localhost:9090/request/getAllRequests");
  }
}
