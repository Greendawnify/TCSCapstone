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
    let tempUserDetails =  sessionStorage.getItem("LoggedInUserDetails");
      if(tempUserDetails != null){
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
      let tempUserDetails =  sessionStorage.getItem("LoggedInUserDetails");
      if(tempUserDetails != null){
        this.isLogout=true;
        this.isLogin=false;
       
        this.router.navigate(["login"])
      }
      else{
      this.isLogout=false;
        this.isLogin=true;
        
        this.router.navigate(["login"])

    }
  }
     
      
          
}
