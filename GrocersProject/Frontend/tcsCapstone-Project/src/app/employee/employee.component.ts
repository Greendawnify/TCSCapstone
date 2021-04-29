import { Component, OnInit } from '@angular/core';
import { RequestService } from './../request.service';
import { EmployeeService } from '../employee.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../model.user';
import { Employee } from './../model.employee';
import { ElementRef, ViewChild } from '@angular/core';

import { Product } from './../model.product';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  products:Product[] = new Array;
  users:User[]=new Array;
  closeModal: string="";
  constructor(public requestService:RequestService,public employeeSer: EmployeeService,private modalService: NgbModal, public userService:UserService) { }
  viewReq:boolean=false

  lockedUsers:User[] = [];
  usersWithOrders:User[] = [];
  temp :Employee = new Employee(1,'1','2','3','3',true);

  orderStatus:any[] = [];
  currentUserID:string = '';
  
 

//displays user that have account locked
  ngOnInit(): void {
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
   
  }

  //function to reset forms
  Resetter(){ 
let element1:HTMLElement = document.getElementById('reset_pass') as HTMLElement;
  element1.click()
  }
//unlock user account 
  unlockUserAccount(userID:any){
    this.userService.unlockUser(userID).subscribe((result:string)=> {
      alert(result);
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
    this.orderStatus = selectedUser.Orders;
    this.currentUserID = selectedUser.autoGenID;
  }
}

statusUpdate(status:any, currentText:any, orderID:number){
  currentText.innerHTML = "Current Status: "+status;

  this.userService.updateOrderStatus(this.currentUserID,orderID,status).subscribe(result => {
    console.log(result);
  }, (err) => console.log(err));
}

}
