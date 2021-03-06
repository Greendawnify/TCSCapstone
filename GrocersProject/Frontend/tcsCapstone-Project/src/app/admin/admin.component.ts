import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ProductServiceService } from './../product.service.service';
import { RequestService } from './../request.service';
import { Request } from './../request.model';
import { User } from '../model.user';
import { UserService } from './../user.service';
import { ReportUser } from './../reportUser.model';
import { Product } from './../model.product';
import { ReportProduct } from './../productReport.model';
import { ReportCustomer } from './../customerReport.model';

import {Employee} from './../model.employee';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';





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
  closeModal: string="";
  requests:Request[] = new Array;
  products:Product[] = [];
  employees:Employee[] = [];
  users:User[] = [];
  userReport:ReportUser[] = [];
  productReport:ReportProduct[] = [];
  custormerReport:ReportCustomer[] = [];

  tableHeading1:string ='';
  tableHeading2:string ='';
  tableHeading3:string ='';
  tableHeading4:string ='';
  Addemp:string ="";
  addprod:string = "";
  delprod:string = "";
  upQuant:string = "";
  upPrice:string = "";
  //date variables
  
  duplicateArray=[]
  constructor(
    public productService:ProductServiceService,
    public empService:EmployeeService,
    public requestService:RequestService,
    public userService:UserService,
    private modalService: NgbModal
    ) { }

  // Testing requests = [{ type:"hello", description:"this this" },{ type:"hello", description:"this this" }]
  ngOnInit(): void {
    this.addprod = " ";
    this.delprod = " ";
    this.Addemp = " ";
    this.deleteMsg=" ";
    this.upQuant = " ";
    this.upPrice = " ";
    
    this.requestService.getAllRequests().subscribe(res => this.requests = res, (err) => console.log(err));
    this.userService.getUsersWithOrders().subscribe(res => this.users = res, (err) => console.log(err));
    this.productService.getAllProducts().subscribe(res => this.products = res, (err) => console.log(err));
    this.empService.getAllEmployees().
    subscribe(res => this.employees = res, (err) => console.log(err));
    
    //reseting the forms
    let element:HTMLElement = document.getElementById('reset_addEmployee') as HTMLElement;
    element.click();
    let element1:HTMLElement = document.getElementById('reset_DelEmployee') as HTMLElement;
     element1.click();
    let element2:HTMLElement = document.getElementById('reset_AddProduct') as HTMLElement;
    element2.click();
    let element3:HTMLElement = document.getElementById('reset_DelProduct') as HTMLElement;
  element3.click();
  let element4:HTMLElement = document.getElementById('reset_upProduct') as HTMLElement;
  element4.click();
  let element5:HTMLElement = document.getElementById('reset_upQuantity') as HTMLElement;
  element5.click();
  }
  //function to reset the forms
  emp_Resetter(){
    let element:HTMLElement = document.getElementById('reset_addEmployee') as HTMLElement;
  element.click();
  let element1:HTMLElement = document.getElementById('reset_DelEmployee') as HTMLElement;
  element1.click();
  this.Addemp = " ";
  this.deleteMsg = " ";
  }
  
  Prod_Resetter(){
    this.addprod = " ";
    this.delprod = " ";
    this.upQuant = " ";
    this.upPrice = " ";
  let element2:HTMLElement = document.getElementById('reset_AddProduct') as HTMLElement;
  element2.click();
  let element3:HTMLElement = document.getElementById('reset_DelProduct') as HTMLElement;
  element3.click();
  let element4:HTMLElement = document.getElementById('reset_upProduct') as HTMLElement;
  element4.click();
  let element5:HTMLElement = document.getElementById('reset_upQuantity') as HTMLElement;
  element5.click();
  
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
    //window.location.reload();
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
      if(res == "record succesfully deleted"){
        //call refill the request array
        this.refillRequestList();
      }
      
    }, err => console.log(err));
  }
//add product to database
  addProduct(productRef:any){
    this.productService.addProduct(productRef).subscribe(res => {
      this.addprod = res;
      if(res == "Record stored succesfully"){
        
        // display text of succesfully insertion
        this.refilProducts();
      }
    }, (err) => console.log(err));
  }
//add an employee to db
  addEmployee(employeeRef:any){
    
    this.empService.addEmployeeDetails(employeeRef).
    subscribe(res => {
      this.Addemp = res
      if(res == "Employee Record stored successfully"){
        // display text of successful insertion
        
        this.refillEmployeeList();
      }
    }, (err) => this.Addemp = "Employee Record stored FAILED");
  }
  //delete employee from db

  // deleteEmployee(idRef.value) if(confirm("Are you sure to delete "+name))
  deleteEmployee(id:any){
    console.log("id is ",id);
    
      this.empService.deleteEmployeeById(id).subscribe((result:string)=> {
        this.deleteMsg=result;
        if(result == "Employee Record deleted successfully"){
          this.refillEmployeeList();
        }
      })
    
 
  }

  //delete product from db
  deleteProduct(deleteRef:any){
    this.productService.deleteProduct(deleteRef.id).subscribe((result:string) =>{
      console.log(result);
      this.delprod = result;
      if(result == "record deleted succesfully"){
        
        this.refilProducts();
      }
    })
  }
//update the product quant
  updateProductQuantity(updateRef:any){
    console.log("quant enter")
    this.productService.updateQuantity(updateRef).subscribe((result:string) => {
      // if succesfule
      this.upQuant = result;
      console.log(result)
      if(result == "record updated succesfully"){
        
        console.log( this.upQuant, " its working update quant");
        this.refilProducts();
      }
    });
  }

  updateProductCost(updaetRef:any){
    this.productService.updateCost(updaetRef).subscribe(res => {
      // if succesful 
      this.upPrice = res;
      if(res == "record updated succesfully"){
        
        this.refilProducts();
      }
    });
  }



  generateReports(generateType:string, date1:string ){ //figure how to get date info frominputs
    // probably need to clear userReport
    this.userReport.length = 0;
    this.productReport.length = 0;

    

    console.log(generateType);
    switch(generateType){
      case "DAILY":
        
        if(date1 == ""){
          console.log("enter a date!");
          return;
        }
        this.dailyReports(date1);
        break;
      case "PRODUCT":
        this.productReports();
        break;
      case "CUSTOMER":
        this.customerReports();
        break;
      case "WEEKLY":
        
        if(date1 == ""){
          console.log("enter a date!");
          return;
        }
        this.weeklyReports(date1);
        break;
      case "MONTHLY":
        
        if(date1 == ""){
          console.log("enter a date!");
          return;
        }
        this.monthlyReports(date1);
        break;
    }
  }

  dailyReports(date:string){
    console.log('daily!', date);
    this.tableHeading4 = "Date";
    this.tableHeading1 = "Customer Name";
    this.tableHeading2 = "Products Sold_Quantity";
    this.tableHeading3 = "Revenue";
    for(let i =0; i < this.users.length; i++){
      for(let j = 0; j < this.users[i].Orders.length; j++){
        // looking inside each order of each user
        if(this.users[i].Orders[j].orderDate === date){
          // ordered on same date searching for add to report list
          // or we can create a new type of array of objects filled with the info we need?
          let newReport = new ReportUser(this.users[i].fName, this.users[i].Orders[j].products, this.users[i].Orders[j].cost, date);
          this.userReport.push(newReport);
        }
      }
    }
    console.log(this.userReport);
  }

  weeklyReports(date1:string){
    console.log("date1: ", date1);
    let dateSplit = date1.split("-");
    this.tableHeading4 = "Date";
    this.tableHeading1 = "Customer Name";
    this.tableHeading2 = "Products Sold_Quantity";
    this.tableHeading3 = "Revenue";
      let tempMon = parseInt(dateSplit[1]);
      let tempDay = parseInt(dateSplit[2]);
      let tempYear = parseInt(dateSplit[0]);
      let strDate;
    for(let i = 7; i > 0; i--){
      
      console.log("At Start Weekly Date: ", tempMon.toString(), "-", tempDay.toString(), "-", tempYear.toString());
      console.log("strDate: ", strDate);
      if((tempMon == 1 || tempMon == 2 || tempMon == 3 || tempMon == 4 || tempMon == 5 || tempMon == 6 ||
        tempMon == 7 || tempMon == 8 || tempMon == 9) && 
        (tempDay == 1 || tempDay == 2 || tempDay == 3 || tempDay == 4 || tempDay == 5 || 
        tempDay == 6 || tempDay == 7 || tempDay == 8 || tempDay == 9)){
          strDate = tempYear.toString()+"-"+"0"+tempMon.toString()+"-"+"0"+tempDay.toString();
      }
      else if(tempMon == 1 || tempMon == 2 || tempMon == 3 || tempMon == 4 || tempMon == 5 || tempMon == 6 ||
        tempMon == 7 || tempMon == 8 || tempMon == 9){
          strDate = tempYear.toString()+"-"+"0"+tempMon.toString()+"-"+tempDay.toString();
        }
      else{
        strDate = tempYear.toString()+"-"+tempMon.toString()+"-"+tempDay.toString();
      }
      console.log("strDate: ", strDate);
      for(let i =0; i < this.users.length; i++){
        for(let j = 0; j < this.users[i].Orders.length; j++){
          // looking inside each order of each user
          if(this.users[i].Orders[j].orderDate === strDate){
            // ordered on same date searching for add to report list
            // or we can create a new type of array of objects filled with the info we need?
            let newReport = new ReportUser(this.users[i].fName, this.users[i].Orders[j].products, this.users[i].Orders[j].cost, strDate);
            //console.log("New Report", newReport);
            this.userReport.push(newReport);
          }
        }
      }

      if(tempDay == 1 && (tempMon == 4 || tempMon == 6 ||
        tempMon == 11))
      {
        tempDay = 32;
        tempMon--;
      }
      else if(tempDay == 1 && (tempMon == 1 || tempMon == 3 ||
        tempMon == 5 || tempMon == 7 || tempMon == 8 || tempMon == 10 ||
        tempMon == 12)){
        
        if(tempDay == 1 && tempMon == 1){
          tempYear--;
          tempDay = 32;
          tempMon = 12;
        }
        else if(tempDay == 1 && tempMon == 3){
          tempMon--;
          tempDay = 30;
        }
        else{
          tempMon--;
          tempDay = 32;
        }
      }
      else if(tempDay == 1 && tempMon == 2){
        tempDay = 32;
        tempMon--;
      }
      tempDay--;
      
    }
  }
  
  monthlyReports(date1:string){
    console.log("date1: ", date1);
    this.tableHeading4 = "Date";
    this.tableHeading1 = "Customer Name";
    this.tableHeading2 = "Products Sold_Quantity";
    this.tableHeading3 = "Revenue";
      for(let i =0; i < this.users.length; i++){
        for(let j = 0; j < this.users[i].Orders.length; j++){
          // looking inside each order of each user
          if(this.users[i].Orders[j].orderDate.split("-")[1] === date1.split("-")[1]){
            // ordered on same date searching for add to report list
            // or we can create a new type of array of objects filled with the info we need?
            let newReport = new ReportUser(this.users[i].fName, this.users[i].Orders[j].products, this.users[i].Orders[j].cost, date1);
            this.userReport.push(newReport);
          }
        }
      }
  }
  productReports(){
    this.tableHeading4 = "Date";
    this.tableHeading1 = "Product Name";
    this.tableHeading2 = "Quantity Sold";
    this.tableHeading3 = "Quantity Left";

    for(let p of this.products){
      let sold = p.initQuantity - p.quantity;
      let newProductReport = new ReportProduct(p.name, sold, p.quantity);
      this.productReport.push(newProductReport);
    }
    console.log(this.productReport);

  }

  customerReports(){
    this.tableHeading4 ="Date";
    this.tableHeading1 ="Cusomter Name";
    this.tableHeading2 ="N/A";
    this.tableHeading3 ="Total Revenue From Customer";

    for(let i =0; i < this.users.length; i++){
      let total = 0;
      for(let j = 0; j < this.users[i].Orders.length; j++){
        total+= this.users[i].Orders[j].cost;
        

      }
      let newCustomReport = new ReportCustomer(this.users[i].fName, true, total);
      this.custormerReport.push(newCustomReport);
    }

  }

  refillEmployeeList(){
    this.empService.getAllEmployees().
    subscribe(res => this.employees = res, (err)=>console.log(err));
  }

  refilProducts(){
    this.productService.getAllProducts().
    subscribe(res => this.products = res, (err)=> console.log(err));
  }

  refillRequestList(){
    this.requestService.getAllRequests().
    subscribe(res => this.requests = res, (err) => console.log(err));
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


  //modal functions   
  triggerModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //end of modal functions


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