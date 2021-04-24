import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ProductServiceService } from './../product.service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Employee:boolean= false;
  Product:boolean=false;
  deleteMsg?:string;
  constructor(public productService:ProductServiceService,public empService:EmployeeService) { }

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

  addProduct(productRef:any){
    this.productService.addProduct(productRef);
  }

  addEmployee(employeeRef:any){
    console.log(employeeRef);
    this.empService.addEmployeeDetails(employeeRef);
    
    

  }
  // deleteEmployee(idRef.value) if(confirm("Are you sure to delete "+name))
  deleteEmployee(id:any){
    console.log("id is "+id);
    if(confirm("Are you sure to delete")){
      this.empService.deleteEmployeeById(id).subscribe((result:string)=> {
        this.deleteMsg=result;
    })
    }
 
  }

  deleteProduct(deleteRef:any){
    this.productService.deleteProduct(deleteRef.id).subscribe((result:string) =>{
      console.log(result);
    })
  }

  updateProductQuantity(updateRef:any){
    this.productService.updateQuantity(updateRef).subscribe((result:string) => console.log(result));
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