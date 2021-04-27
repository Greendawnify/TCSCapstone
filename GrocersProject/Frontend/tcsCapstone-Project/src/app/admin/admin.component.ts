import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ProductServiceService } from './../product.service.service';
import { RequestService } from './../request.service';
import { Request } from './../request.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Employee:boolean= false;
  Product:boolean=false;
  request:boolean = false;
  report:boolean = false;
  deleteMsg?:string;
  requests:Request[] = new Array;
  constructor(
    public productService:ProductServiceService,
    public empService:EmployeeService,
    public requestService:RequestService
    ) { }

  ngOnInit(): void {
    this.requestService.getAllRequests().subscribe(res => this.requests = res);
  }

  Emp_visible(){
    this.invisible();
    this.Employee=true;
  }
  Prd_visible(){
    this.invisible();
    this.Product=true;
    
  }

  requestVisible(){
    this.invisible();
    this.request = true;
  }

  reportsVisible(){
    this.invisible();
    this.report = true;
  }

  invisible(){
    this.Employee = false;
    this.Product = false;
    this.request = false;
    this.report = false;
  }

  completedRequest(type:string, description:string, sender:string){
    console.log(type, description);
    
    this.requestService.delete(sender, description, type).
    subscribe((res:string) => console.log(res), err => console.log(err));
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