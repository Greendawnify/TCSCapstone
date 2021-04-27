import { Component, OnInit } from '@angular/core';
import { RequestService } from './../request.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public requestService:RequestService,public employeeSer: EmployeeService) { }

  ngOnInit(): void {
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
  
}
