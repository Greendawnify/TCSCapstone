import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin:boolean= true;
  isLogout:boolean=false;

  title = 'tcsCapstone-Project';
  Logged_in(){
    this.isLogin=false;
    this.isLogout=true;
    }
  Logged_out(){
    this.isLogin=true;
    this.isLogout=false;

  }
}
