import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from './admin.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminRecord:Object = {};
  constructor(public http:HttpClient) { }


  checkAdminCredentials(id:string, password:string):Object{
    let obj = {
      id,
      password
    };

    this.http.post('http://localhost:9090/admin/checkCredentials', obj).
    subscribe(res => {
      console.log(res);
      this.adminRecord = res;
    }, err => console.log(err));

    return this.adminRecord;
  }
}
