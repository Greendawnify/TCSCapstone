import { Component, OnInit } from '@angular/core';
import { RequestService } from './../request.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public requestService:RequestService) { }

  ngOnInit(): void {
  }

  createRequest(request:any){
    // the values in the body have to be Type, and Description
    this.requestService.createRequest(request);
  }

}
