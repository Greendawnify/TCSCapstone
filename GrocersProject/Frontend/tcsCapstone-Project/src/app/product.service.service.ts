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
    return this.http.post("http://localhost:9090/product/addProduct", productRef, {responseType:'text'});
  }

  deleteProduct(ID:any):any{
    return this.http.delete("http://localhost:9090/product/deleteProduct/"+ID, {responseType:'text'});
  }

  updateQuantity(updateRef:any):any{
    return this.http.put("http://localhost:9090/product/updateQuantity", updateRef, {responseType:'text'});
  }

  updateCost(updateRef:any){
    return this.http.put("http://localhost:9090/product/updateCost", updateRef, {responseType:"text"});
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:9090/product/getAllProducts");
  }

  reduceProductQuantity(reduceObj:any){
    return this.http.put("http://localhost:9090/product/reduceQuantity", reduceObj);
  }
}
