import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './model.product';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(public http:HttpClient) { }

  addProduct(productRef:any){
    this.http.post('http://localhost:9090/product/addProduct', productRef).
    subscribe(res =>console.log(res), err => console.log(err));
  }
}
