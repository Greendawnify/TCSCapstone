import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router:Router) { }  
  isLogin:boolean= true;
  isLogout:boolean=false;
 
  profile:boolean = false;

  title = 'tcsCapstone-Project';
  ngOnInIt(){
    let emplyeeToken =  sessionStorage.getItem("emplyeeToken");
      let adminToken =  sessionStorage.getItem("adminToken");
      let userToken =  sessionStorage.getItem("userToken");
      

      if( (userToken != null) || (adminToken != null) || (emplyeeToken != null) ){
        this.isLogout=true;
        this.isLogin=false;
       
        this.router.navigate(["login"])
      }
      else{
      this.isLogout=false;
        this.isLogin=true;
        
        this.router.navigate(["login"])
    }}
  
 
    isLoggedIn(){
      let emplyeeToken =  sessionStorage.getItem("emplyeeToken");
      let adminToken =  sessionStorage.getItem("adminToken");
      let userToken =  sessionStorage.getItem("userToken");
      

      if( (userToken != null) || (adminToken != null) || (emplyeeToken != null) ){
        this.isLogout=true;
        this.isLogin=false;
       
        this.router.navigate(["login"])
      }
      else{
      this.isLogout=false;
        this.isLogin=true;
        sessionStorage.removeItem("emplyeeToken");
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("userToken");

        
        this.router.navigate(["login"])

    }
  }
     
      
          
}
