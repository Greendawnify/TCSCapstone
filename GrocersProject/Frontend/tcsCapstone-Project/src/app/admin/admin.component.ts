import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Employee:boolean= false;
  Product:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  Emp_visible(){
    this.Product=false;
    this.Employee=true;
  }
  Prd_visible(){
    this.Employee=false;
    this.Product=true;
    
  }


  

}



// <div>
// <mat-tab-group mat-align-tabs="start">
// <mat-tab class="input" label="Employee"><div [innerHTML]="deleteCourse"></div></mat-tab>
// <mat-tab label="Products">Products</mat-tab> 
// </mat-tab-group>
// </div>
// deleteCourse = `
  
// <mat-card class="example-card">
// <mat-card-header>
// <mat-card-title>Delete Employee</mat-card-title>
// </mat-card-header>
// <mat-card-actions>
// <button color="primary">Primary</button>
// </mat-card-actions>
// </mat-card>`