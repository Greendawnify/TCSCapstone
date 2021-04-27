import { Component, OnInit } from '@angular/core';
import { RequestService } from './../request.service';
import { EmployeeService } from '../employee.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../model.user';


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


//displays user that have account locked
  ngOnInit(): void {
    this.userService.getRaisedTicket().
    subscribe(result=>{
      this.lockedUsers = result;
      console.log(this.lockedUsers);
    }, err => console.log(err));
   
  }

//unlock user account 
  unlockUserAccount(userID:any){
    this.userService.unlockUser(userID).subscribe((result:string)=> {
      alert(result);
      console.log("Successfully unlocked")
    });
  }




  createRequest(request:any){
    // the values in the body have to be Type, and Description, and sender
    // need to add the current employee record to local storage and then add its id or name to this request
    let newObj = {
      type:request.type,
      description:request.description,
      sender: "phil"// the current employees name or id
    };
    this.requestService.createRequest(request);
  }


  updateEmployeePwd(empRef:any){
    console.log(empRef);
    this.employeeSer.updateEmployeePassword(empRef).subscribe((result:string)=> {
    });
  }
  //ticket raised array for testing
  requests = [{ type:"hello", description:"this this",user_id:"anudeep" },{ type:"hello", description:"this this",user_id:"balla" }]
  unlockUser(user_id:any){
    //function to unlock a user

  }
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

}
