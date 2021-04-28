import { Component, OnInit } from '@angular/core';
import { RequestService } from './../request.service';
import { EmployeeService } from '../employee.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../model.user';
import { Employee } from './../model.employee';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  closeModal: string="";
  constructor(public requestService:RequestService,public employeeSer: EmployeeService,private modalService: NgbModal, public userService:UserService) { }
  viewReq:boolean=false

  lockedUsers:User[] = [];
  usersWithOrders:User[] = [];
  temp ?:Employee;

  orderStatus:any[] = [];
  
 

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
        
      }
    }
   
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
      sender: emp.name
    };
    this.requestService.createRequest(newObj);
  }


  updateEmployeePwd(newPass:any){
    console.log(newPass);
    this.employeeSer.updateEmployeePassword(this.temp?._id,newPass).subscribe((result:string)=> {
    });
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

//passowrds show
passType: string = "password";

changePasswordType(){
if(this.passType === "password"){
this.passType= "text"
}
else{
this.passType == "password"
}
}


viewOrders(user_id:any){

  let selectedUser:User|undefined;
  selectedUser = this.usersWithOrders.find(user => {
    return user.autoGenID == user_id;
  });

  if(selectedUser){
    console.log(selectedUser.Orders);
    this.orderStatus = selectedUser.Orders;
  }
}

statusUpdate(status:any, currentText:any){
  console.log("New status is",status);
  console.log("current text is ",currentText);
}

}
