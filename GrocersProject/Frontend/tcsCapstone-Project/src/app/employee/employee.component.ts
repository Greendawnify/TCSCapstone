import { Component, OnInit } from '@angular/core';
import { RequestService } from './../request.service';
import { EmployeeService } from '../employee.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../model.user';
import { Employee } from './../model.employee';
import { ElementRef, ViewChild } from '@angular/core';
import { ProductServiceService } from './../product.service.service';
import { Product } from './../model.product';




@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  products:Product[] = new Array;
  userOrders: any [] = [];

  users:User[]=new Array;
  closeModal: string="";
  Requp: string="";
  sentRequestString:string ='';
  constructor(
    public requestService:RequestService,
    public employeeSer: EmployeeService,
    private modalService: NgbModal, 
    public userService:UserService,
    public productService:ProductServiceService,
    ) { }
  viewReq:boolean=false

  lockedUsers:User[] = [];
  usersWithOrders:User[] = [];
  allProducts:Product[] = [];
  temp :Employee = new Employee(1,'1','2','3','3',true);

  orderStatus:any[] = [];
  currentUserID:string = '';
  
  allproducts:Product[] = new Array;

//displays user that have account locked
  ngOnInit(): void {
    this.Requp = " "
    this.userService.getRaisedTicket().
    subscribe(result=>{
      this.lockedUsers = result;
      console.log(this.lockedUsers);
    }, err => console.log(err));

    this.userService.getUsersWithOrders().
    subscribe(result =>{
      this.usersWithOrders = result;
      console.log(this.usersWithOrders);
    }, (err) => console.log(err));

    this.productService.getAllProducts().
    subscribe(res=> this.allProducts = res, (err) => console.log(err));

    let sessionString = sessionStorage.getItem("currentEmployee");
    let empObj;
    if(sessionString){
      empObj = JSON.parse(sessionString);
      this.temp = empObj;
      // is this the first time signing in
      if(empObj.resetpwd){
        // first time signing in
        let element:HTMLElement = document.getElementById('openModal') as HTMLElement;
        element.click();
        
      }
    }
    let element1:HTMLElement = document.getElementById('reset_pass') as HTMLElement;
  element1.click()
  this.productService.getAllProducts().subscribe(res=> this.allproducts = res,(err)=> console.log(err));
   
  }

  //function to reset forms
  Resetter(){ 
let element1:HTMLElement = document.getElementById('reset_pass') as HTMLElement;
  element1.click()
  }
//unlock user account 
  unlockUserAccount(userID:any){
    this.userService.unlockUser(userID).subscribe((result:string)=> {
      this.Requp=result
      console.log("Successfully unlocked")
      window.location.reload();
    });
  }

  updateOrderStatus(userID:string, orderID:number, status:string){
    
    this.userService.updateOrderStatus(userID, orderID, status).
    subscribe(result =>{
      console.log('result')
    }, (err) => console.log(err));
  }


  createRequest(subject:any, desc:any){
    // the values in the body have to be Type, and Description, and sender
    // need to add the current employee record to local storage and then add its id or name to this request
    console.log(subject)
    if(desc.value == "" || subject == "" || subject == "Subject..."){
      this.sentRequestString = 'Please Enter valid';
      return;
    }
    let currentEmployeJson = sessionStorage.getItem("currentEmployee");
    let emp;
    if(currentEmployeJson){
      emp = JSON.parse(currentEmployeJson);
    }

    let newObj = {
      type:subject,
      description:desc,
      sender: emp.firstname
    };
    this.requestService.createRequest(newObj);
    this.sentRequestString = "";
    desc.value = "";
    alert("Sent request");
  }


  updateEmployeePwd(newPass:string){
    console.log(newPass);
    newPass.trim();
    if(newPass != ""){

      this.employeeSer.updateEmployeePassword(this.temp._id,newPass).subscribe((result:string)=> {
        this.temp.password = newPass;
        this.temp.resetpwd = false;

        sessionStorage.setItem("currentEmployee", JSON.stringify(this.temp));
      });
    }else{
      console.log("error. Need to input valid string")
    }
  }
  //ticket raised array for testing
  requests = [{ type:"hello", description:"this this",user_id:"anudeep" },{ type:"hello", description:"this this",user_id:"balla" }]
  viewRequest(){
    this.viewReq = !(this.viewReq)
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






viewOrders(user_id:any){

  let selectedUser:User|undefined;
  selectedUser = this.usersWithOrders.find(user => {
    return user.autoGenID == user_id;
  });

  if(selectedUser){
    console.log(selectedUser.Orders);
    this.orderStatus = selectedUser.Orders.filter(order => order.status != "Canceled");
    this.currentUserID = selectedUser.autoGenID;
  }else{
    console.log("Incorrect userID")
    // display some string to let the user know
  }
}

statusUpdate(status:any, currentText:any, orderID:number, userAutoGenID:String){
  currentText.innerHTML = "Current Status: "+status;
  

  if(status != "Canceled"){
    this.userService.updateOrderStatus(this.currentUserID,orderID,status).subscribe(result => {
      console.log(result);
    }, (err) => console.log(err));
  }
  else{
    this.userService.updateOrderStatus(this.currentUserID,orderID,status).subscribe(result => {
      console.log(result);
    }, (err) => console.log(err));


    console.log(userAutoGenID, " ", orderID);
    let currentUser = this.usersWithOrders.find(element => element.autoGenID == userAutoGenID);
    if(currentUser){
      let orderToCancel : any;
      for(let x of currentUser.Orders){
        if(x.id == orderID && x.status != status){
          //console.log("Current User Funds: ", currentUser.funds, " Order Cost: ", x.cost);
          let newFund = parseInt(currentUser.funds.toString()) + parseInt(x.cost.toString()); 
          //console.log("New Fund: ", newFund);
          orderToCancel = {
            userID: currentUser.autoGenID,
            orderID: x.id, 
            cost: newFund, 
            //status: x.status, 
            //products: x.products 
          }
          this.replaceProducts(x);
        } 
        // this.productService.replaceProductQuantity(x).subscribe(res => {
        //   this.refillProducts();
        // }, (err) => console.log(err));
      }
      this.orderStatus = this.orderStatus.filter(o => o.id != orderID);
      this.userService.deleteOrder(orderToCancel).subscribe(res =>{
        if(res == "Success"){
          
         // this.userOrders = this.userOrders.filter(o => o.id != orderID);
        }
      });

    }
  }
}

replaceProducts(userObj:any){
   console.log(userObj); 
   for(let p of userObj.products){
      // call service to add back the product hopefully works 
      let split = p.split('_'); 
      let newObj ={ name:split[0], quantity:split[1] }
       console.log("New Obj: ", newObj); 
       this.productService.replaceProductQuantity(newObj).subscribe(res => {
          this.refillProducts(); 
        }, (err) => console.log(err)); 
    } 
}

refillProducts(){
  this.productService.getAllProducts().
  subscribe(res => this.allProducts = res, (err) =>console.log(err));
}

}
