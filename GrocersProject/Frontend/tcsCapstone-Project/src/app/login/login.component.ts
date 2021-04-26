import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { AdminService } from './../admin.service';
import { Admin } from './../admin.model';




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
    ) {}
  ngOnInit(): void {
  }
  
  signIn(userID:any, userPword:any){
    console.log(userID, userPword);
    this.useService.signUserDetailsInfo(userID, userPword).subscribe(result => {
      console.log(result)
      if(result?.length>0){
        
        //this.resultMsg="id is "+result[0]._id+" Product Name "+result[0].pname+" Price "+result[0].price;
      }else {
        //this.resultMsg="Product is not present";
      }
    });
    //this.router.navigate(["user"])
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
          console.log('same password')
          this.router.navigate(["admin"]);
        }else{
          console.log('wrong password');
        }
      }
    }, err => console.log(err));
  };


  EmployeeSignUp(userID:any, userPword:any){
    this.router.navigate(["employee"])
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

