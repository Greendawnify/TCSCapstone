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
  isCart:boolean=false;
  profile:boolean = false;

  title = 'tcsCapstone-Project';
 
    home_Page(){
    
      this.router.navigate(["user"])
      }
      Login_user(){
        this.isLogout=true;
        this.isLogin=false;
        this.isCart=true;
        this.router.navigate(["login"])
      }
      Logout_user(){
        this.isLogout=false;
        this.isLogin=true;
        this.isCart=false;
        this.router.navigate(["login"])
      }
      toCart(){
  
        this.router.navigate(["cart"])
      }
          
}
