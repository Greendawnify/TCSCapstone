import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './model.product';
import { DeployService } from './deploy.service';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(public http:HttpClient, public deploy:DeployService) { }

  addProduct(productRef:any){
    this.http.post(this.deploy.deploymentURL+"/product/addProduct", productRef, {responseType:'text'}).
    subscribe(res =>console.log(res), err => console.log(err));
  }

  deleteProduct(ID:any):any{
    return this.http.delete(this.deploy.deploymentURL+"/product/deleteProduct/"+ID, {responseType:'text'});
  }

  updateQuantity(updateRef:any):any{
    return this.http.put(this.deploy.deploymentURL+"/product/updateQuantity", updateRef, {responseType:'text'});
  }

  updateCost(updateRef:any){
    return this.http.put(this.deploy.deploymentURL+"/product/updateCost", updateRef, {responseType:"text"});
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.deploy.deploymentURL+"/product/getAllProducts");
  }

  reduceProductQuantity(reduceObj:any){
    return this.http.put(this.deploy.deploymentURL+"/product/reduceQuantity", reduceObj);
  }
}
