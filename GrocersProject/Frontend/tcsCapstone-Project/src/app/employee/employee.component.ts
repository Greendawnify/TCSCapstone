import { Component, OnInit } from '@angular/core';
import { RequestService } from './../request.service';
import { EmployeeService } from '../employee.service';
import { UserService } from '../user.service';
import { User } from '../model.user';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  users?:Array<User>;

  constructor(public requestService:RequestService,public employeeSer: EmployeeService, public userService:UserService) { }

//displays user that have account locked
  ngOnInit(): void {
    this.userService.getRaisedTicket().subscribe(result=>this.users = result);
    console.log("Unlocked users details:" +this.users)
   
  }

//unlock user account 
  unlockUserAccount(unlockUserForm:any){
    
    unlockUserForm.raiseOrLowerTicker = false; 
    console.log(unlockUserForm);
    this.userService.raiseTicketService(unlockUserForm).subscribe((result:string)=> {
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
  requests = [{ type:"hello", description:"this this" },{ type:"hello", description:"this this" }]
  
}
