import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ProductServiceService } from './../product.service.service';
import { RequestService } from './../request.service';
import { Request } from './../request.model';
import { User } from '../model.user';
import { UserService } from './../user.service';
import { ReportUser } from './../reportUser.model';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Employee:boolean= false;
  Product:boolean=false;
  generated:boolean=false;
  request:boolean = false;
  report:boolean = false;
  deleteMsg?:string;
  requests:Request[] = new Array;
  users:User[] = [];
  userReport:ReportUser[] = [];
  //date variables
  
  duplicateArray=[]
  constructor(
    public productService:ProductServiceService,
    public empService:EmployeeService,
    public requestService:RequestService,
    public userService:UserService,
    ) { }

  // Testing requests = [{ type:"hello", description:"this this" },{ type:"hello", description:"this this" }]
  ngOnInit(): void {
    this.requestService.getAllRequests().subscribe(res => this.requests = res, (err) => console.log(err));
    this.userService.getUsersWithOrders().subscribe(res => this.users = res, (err) => console.log(err));
  }
//employee tab visible
  Emp_visible(){
    this.invisible();
    this.Employee=true;
  }
  //products tab visible
  Prd_visible(){
    this.invisible();
    this.Product=true;
    
  }

  
//reports tab visible
  reportsVisible(){
    this.invisible();
    this.report = true;
  }
//tab to disable all the tabs
  invisible(){
    this.Employee = false;
    this.Product = false;
    this.report = false;
  }
//Requests from employee marked complete function
  completedRequest(type:string, description:string, sender:string){
    console.log(type, description);
    
    this.requestService.delete(sender, description, type).
    subscribe((res:string) => {
      console.log(res);
      window.location.reload();
    }, err => console.log(err));
  }
//add product to database
  addProduct(productRef:any){
    this.productService.addProduct(productRef);
  }
//add an employee to db
  addEmployee(employeeRef:any){
    console.log(employeeRef);
    this.empService.addEmployeeDetails(employeeRef);
    
    

  }
  //delete employee from db

  // deleteEmployee(idRef.value) if(confirm("Are you sure to delete "+name))
  deleteEmployee(id:any){
    console.log("id is "+id);
    if(confirm("Are you sure to delete")){
      this.empService.deleteEmployeeById(id).subscribe((result:string)=> {
        this.deleteMsg=result;
    })
    }
 
  }

  //delete product from db
  deleteProduct(deleteRef:any){
    this.productService.deleteProduct(deleteRef.id).subscribe((result:string) =>{
      console.log(result);
    })
  }
//update the product quant
  updateProductQuantity(updateRef:any){
    this.productService.updateQuantity(updateRef).subscribe((result:string) => console.log(result));
  }

  
  
//Dummy data for testing 

  dummy_user:any =[
    {fName: "anu",lName: "deep",order:[{id: 1234, products: "banana", cost: 12, status: "shipping", orderDate: 1/1/2020
  
    }] },{fName: "balla",lName: "deep",order:[{id: 1234, products: "banana", cost: 12, status: "shipping", orderDate: 1/2/2020
  
  }]}
  ]
  dummy_product=[{
   
    name: "banana",
    initQuantity: 100,
    quantity: 20,
    cost: 12,
    
  },{
   
    name: "orange",
    initQuantity: 100,
    quantity: 30,
    cost: 12,
    
  }]

  generateReports(generateType:string, date1:string, date2:string){ //figure how to get date info frominputs
    // probably need to clear userReport
    console.log(generateType);
    switch(generateType){
      case "DAILY":
        this.DailyReports(date1);
        break;
    }
  }

  DailyReports(date:string){
    console.log('daily!', date);
    for(let i =0; i < this.users.length; i++){
      for(let j = 0; j < this.users[i].Orders.length; j++){
        // looking inside each order of each user
        if(this.users[i].Orders[j].orderDate === date){
          // ordered on same date searching for add to report list
          // or we can create a new type of array of objects filled with the info we need?
          let newReport = new ReportUser(this.users[i].fName, this.users[i].Orders[j].products, this.users[i].Orders[j].cost);
          this.userReport.push(newReport);
        }
      }
    }
    console.log(this.userReport);
  }



   dummy_products:any;
   total_cost:any;
  productsReport(reportForm:any){
    // this.dummy_products = this.dummy_product;
    // let selectedUsers = this.dummy_user.filter((f:any) => new Date(f.orders.orderDate) > reportForm.fromDate && new Date(f.orders.orderDate) < reportForm.toDate);
    // console.log(selectedUsers)
    // for (var val of selectedUsers ) {
    //   this.total_cost += val.order.cost
  }

}

//function to show "SHOW"  button
// ReportGenerated(){
//   this.generated=true

// }
// }
 



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