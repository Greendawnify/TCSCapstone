import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  public deploymentURL:string = "http://54.152.53.89:9091";
  
  constructor() { }

}
