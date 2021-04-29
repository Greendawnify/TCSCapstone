import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from './admin.model';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminRecord:Object = {};
  record:boolean = false;;
  num:number = -1;
  constructor(public http:HttpClient) { }

  adminCredentials(id:string):Observable<any>{

      return this.http.get<any>("http://localhost:9090/admin/getAdmin/" + id);
    }
}
