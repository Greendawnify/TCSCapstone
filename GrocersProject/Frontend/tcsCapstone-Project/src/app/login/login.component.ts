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
    
    let tempObj = {"autoGenID":userID, "pWord": userPword};


    
    this.useService.signUserDetailsInfo(tempObj).subscribe(result=> {
      //console.log("Sign In: " + result);
      //JSON.parse(result);
      if(result != null){
        console.log("Sign In: " + result);
        if(result == "You are locked out! Raise ticket!")
          alert(result);
        else{
          if(result == "Password correct"){
            let tempUser = {};
            this.useService.retrieveUserById(tempObj).subscribe( result =>{
              if(result != null){
                JSON.stringify(result);
                console.log(result);
                sessionStorage.setItem('LoggedInUserDetails', result);
                this.router.navigate(["user"]);
              }
            });
          }
          else if(result == "User ID not found")
            alert("User ID not found");
          else if(Number(result) == 3 || Number(result) == 2 || Number(result) == 1)
            alert("Incorrect Password! " + result + " tries left!");
          else if(result == "Your number of tries depleted. You are locked out! Raise ticket!")
            alert(result);
        }
      }
    });
  }
  
  
  signUserUp(mySignUpForm:any){
    console.log(mySignUpForm);
    this.useService.signUpUserDetails(mySignUpForm).subscribe(data => {
      if(data != null){
        if(data = "Record stored successfully!"){
          console.log(mySignUpForm);
          this.useService.generateUserID(mySignUpForm).subscribe((resultFinal:string)=> {  
            alert(resultFinal);
          });
        }
      }
    });
    //this.proService.storeProductDetailsInfo(productRef);
  }

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
          sessionStorage.setItem("employeeToken", "123");
          console.log("Employee obj",result);
          sessionStorage.setItem("currentEmployee", JSON.stringify(result));
          this.router.navigate(["employee"]);
        }else{
          alert("Wrong Password")
        }
      }
    }, error =>console.log(error));
  }

  raiseTicketFunc(myTicketForm:any){
    console.log(myTicketForm);
    // Created a new property in the ticket form object to send to the backed, true (when user raises the ticket)
    // False if the employee is lowering the ticket (For Code Reusability). In the backend this boolean will be checked before
    // the backed raising and deleting ticket is done.
    myTicketForm.raiseOrLowerTicker = true; 
    console.log(myTicketForm);

    this.useService.raiseTicketService(myTicketForm).subscribe((result:string)=> {
      alert(result);
    });
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