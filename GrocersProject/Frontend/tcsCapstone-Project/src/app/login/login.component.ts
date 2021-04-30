import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { AdminService } from './../admin.service';
import { Admin } from './../admin.model';
import { EmployeeService } from '../employee.service';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  closeModal: string="";
  adminRecord:Object ={};
  signing:string = "";
  sign_up:string = "";
  constructor(
    private modalService: NgbModal,
    public router:Router, 
    public useService:UserService,
    public adminService:AdminService,
    public empService:EmployeeService 
    ) {}
  ngOnInit(): void {
    this.signing = "";
    this.sign_up=" ";
    let element:HTMLElement = document.getElementById('reset_signin') as HTMLElement;
    element.click();
    let element1:HTMLElement = document.getElementById('reset_login') as HTMLElement;
    element1.click();
    let element2:HTMLElement = document.getElementById('reset_forgotLogin') as HTMLElement;
    element2.click();
  }
  Resetter(){
    this.sign_up=" ";
    this.signing = "";
    let element:HTMLElement = document.getElementById('reset_signin') as HTMLElement;
    element.click();
    let element1:HTMLElement = document.getElementById('reset_login') as HTMLElement;
    element1.click();
    let element2:HTMLElement = document.getElementById('reset_forgotLogin') as HTMLElement;
    element2.click();
  }

  
//signIn function for user
  signIn(userID:any, userPword:any){
    console.log(userID, userPword);
    
    let tempObj = {"autoGenID":userID, "pWord": userPword};


    
    this.useService.signUserDetailsInfo(tempObj).subscribe(result=> {
      //console.log("Sign In: " + result);
      //JSON.parse(result);
      if(result != null){
        console.log("Sign In: " + result);
        if(result == "You are locked out! Raise ticket!")
          {
          this.signing="You are locked out! Raise ticket!";}
        else{
          if(result == "Password correct"){
            this.useService.retrieveUserById(tempObj).subscribe( result =>{
              if(result != null){
                JSON.stringify(result);
                console.log(result);
                let tempResult = JSON.stringify(result);
                sessionStorage.setItem('userToken', '123');
                console.log("After Session Storage, result type and result is: " , typeof(tempResult) , tempResult);
                sessionStorage.setItem('LoggedInUserDetails', tempResult);
                localStorage.removeItem('cart');
                this.router.navigate(["user"]);
              }
            });
          }
          else if(result == "User ID not found")
            {
            this.signing="User ID not found";}
          else if(Number(result) == 3 || Number(result) == 2 || Number(result) == 1)
            {
            this.signing= "Incorrect Password! " + result + " tries left!"}
          else if(result == "Your number of tries depleted. You are locked out! Raise ticket!")
            {
              this.signing = result }
        }
      }
    });
  }
  
  //user Sign Up function
  signUserUp(mySignUpForm:any){
    console.log(mySignUpForm);
    this.useService.signUpUserDetails(mySignUpForm).subscribe(data => {
      if(data != null){
        if(data = "Record stored successfully!"){
          console.log(mySignUpForm);
          this.useService.generateUserID(mySignUpForm).subscribe((resultFinal:string)=> {
            this.sign_up = resultFinal;
          });
        }
      }
    });
    //this.proService.storeProductDetailsInfo(productRef);
  }

  //Admin sign in function
  adminSignIn(userID:any, userPassword:any){
    this.adminService.adminCredentials(userID).
    subscribe(res => {
      console.log(res);
      if(res != null){
        if(userPassword == res.password){
          
          sessionStorage.setItem('adminToken', '123');
          this.router.navigate(["admin"]);
        }else{
          console.log('wrong password');
          this.signing="wrong password Admin!"
        }
      }
    }, err => console.log(err));
  };

  //employee sign IN
  employeeSignin(userID:any,userPword:any) {
    this.empService.validateEmpLogin(userID).subscribe(result => {
      this.signing=result
      // console.log(result);
      if(result != null){
        if(userPword == result.password){
          
          this.signing="Login Sucess"
          sessionStorage.setItem("employeeToken", "123");
          console.log("Employee obj",result);
          sessionStorage.setItem("currentEmployee", JSON.stringify(result));
          sessionStorage.setItem('employeeToken', '123');
          this.router.navigate(["employee"]);
        }else{
          
          this.signing=result
        }
      }
    }, error =>console.log(error));
  }

  //Function to raise a ticket
  raiseTicketFunc(myTicketForm:any){
    console.log(myTicketForm);
    // Created a new property in the ticket form object to send to the backed, true (when user raises the ticket)
    // False if the employee is lowering the ticket (For Code Reusability). In the backend this boolean will be checked before
    // the backed raising and deleting ticket is done.
    myTicketForm.raiseOrLowerTicker = true; 
    console.log(myTicketForm);

    this.useService.raiseTicketService(myTicketForm).subscribe((result:string)=> {
      this.signing=result
    });
  }

//modal trigger function
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