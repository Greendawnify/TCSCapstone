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

  title = 'tcsCapstone-Project';
  Logged_in(){
    
    this.router.navigate(["login"])
    }
    home_Page(){
    
      this.router.navigate(["user"])
      }
      Profile(){
    
        this.router.navigate(["profile"])
        }
  
}
