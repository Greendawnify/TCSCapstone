import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from './admin.model';
import { DeployService } from './deploy.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminRecord:Object = {};
  record:boolean = false;;
  num:number = -1;
  constructor(public http:HttpClient, public deploy:DeployService) { }

  adminCredentials(id:string):Observable<any>{

      return this.http.get<any>('http://localhost:9090/admin/getAdmin/' + id);
    }
}
