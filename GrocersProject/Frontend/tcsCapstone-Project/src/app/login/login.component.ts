import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { AdminService } from './../admin.service';
import { Admin } from './../admin.model';
import { EmployeeService } from '../employee.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  closeModal: string="";
  adminRecord:Object ={};
  
  constructor(
    private modalService: NgbModal,
    public router:Router, 
    public useService:UserService,
    public adminService:AdminService,
    public empService:EmployeeService 
    ) {}
  ngOnInit(): void {
  }

  signIn(userID:any, userPword:any){
    console.log(userID, userPword);
    
    let tempObj = {"email":userID, "pWord": userPword};

    
    this.useService.signUserDetailsInfo(tempObj).subscribe(result=> {
      if(result != null){
        if(result.msg == "You are locked out! Raise ticket!")
          alert(result.msg);
        else{
          if(result.msg == "Password correct")
          this.router.navigate(["user"]);
          else if(result.msg == "Email not found")
            alert("Email not found");
          else if(result.loginTries == 3 || result.loginTries == 2 || result.loginTries == 1)
            alert("Incorrect Password! " + result.loginTries + " tries left!");
          else if(result.msg == "Your number of tries depleted. You are locked out! Raise ticket!")
            alert(result.msg);
        }
      }
    });
  }
  
  
  signUserUp(mySignUpForm:any){
    console.log(mySignUpForm);
    this.useService.signUpUserDetails(mySignUpForm);
    //this.proService.storeProductDetailsInfo(productRef);
  }

  adminSignIn(userID:any, userPassword:any){
    this.adminService.adminCredentials(userID).
    subscribe(res => {
      console.log(res);
      if(res != null){
        if(userPassword == res.password){
          
          this.router.navigate(["admin"]);
        }else{
          console.log('wrong password');
        }
      }
    }, err => console.log(err));
  };

  employeeSignin(userID:any,userPword:any) {
    this.empService.validateEmpLogin(userID).subscribe(result => {
      // console.log(result);
      if(result != null){
        if(userPword == result.password){
          alert("Login Sucess")
          this.router.navigate(["employee"]);
        }else{
          alert("Wrong Password")
        }
      }
    }, error =>console.log(error));
  }

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
}

