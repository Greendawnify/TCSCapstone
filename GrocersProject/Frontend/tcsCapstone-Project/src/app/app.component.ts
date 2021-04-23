import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin:boolean= true;

  title = 'tcsCapstone-Project';
  Emp_visible(){
    this.isLogin=false;
    
  }
}
