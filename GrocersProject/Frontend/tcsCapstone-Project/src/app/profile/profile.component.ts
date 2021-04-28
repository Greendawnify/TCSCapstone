import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  closeModal: string="";
  
  signedInUserDetails:any = {};

  ngOnInit(): void {
    //this.signedInUserDetails = JSON.parse());
    //console.log("In Init");
    let tempUserDetails =  sessionStorage.getItem("LoggedInUserDetails");
    console.log(tempUserDetails);
    if(tempUserDetails != null){
      this.signedInUserDetails = JSON.parse(tempUserDetails);
      console.log("Type and Result:" , typeof(tempUserDetails) , " ", tempUserDetails);
      //this.signedInUserDetails = tempUserDetails;
      console.log("Type and Result:" , typeof(this.signedInUserDetails) , " ", this.signedInUserDetails);
    }
    else{
      console.log("tempUserDetails is null");
    }
  }
  
  
  constructor(private modalService: NgbModal,public useService:UserService,) {}
  
  updateUser(myUpdateForm:any){
    console.log("Update User is called:", myUpdateForm);
    let tempSignedInUser:any = this.signedInUserDetails;
    function clean(obj:any) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] == "") {
          delete obj[propName];
        }
      }
      return obj;
    }
    let merged = {...tempSignedInUser, ...clean(myUpdateForm)};
    console.log("Original User Data: " , tempSignedInUser);
    console.log("Cleaned Update Form: ", myUpdateForm);
    console.log(merged);
    this.useService.updateProfile(merged).subscribe((result:string)=> {
      alert(result);
    });
    //console.log();
  }
  
  updateUserFunds(myUpdateFundsForm:any){
    console.log("Update User Funds is called:", myUpdateFundsForm);

    if(this.signedInUserDetails.actNum == myUpdateFundsForm.actNum || this.signedInUserDetails.phoneNum == myUpdateFundsForm.phoneNum){
      if(this.signedInUserDetails.balance != 0){
        if(myUpdateFundsForm.fundsToAdd < this.signedInUserDetails.balance){
          let tempFunds = parseInt(this.signedInUserDetails.funds) + parseInt(myUpdateFundsForm.fundsToAdd);
          let remainingBalance = this.signedInUserDetails.balance - myUpdateFundsForm.fundsToAdd;
          let tempFundsObj = { "funds": tempFunds, "balance": remainingBalance };
          console.log(tempFundsObj);
          let merged = {...this.signedInUserDetails, ...tempFundsObj};
          console.log(merged);

          this.useService.updateProfile(merged).subscribe((result:string)=> {
            alert(result);
          });
        }
        else{
          alert("You can't add funds more than your balance!");
        }
      }
      else{
        alert("Your total balance is empty!");
      }
      /* let tempFundsObj = { funds: myUpdateFundsForm.fundsToAdd };
      console.log(tempFundsObj);
      let merged = {...this.signedInUserDetails, ...tempFundsObj};
      console.log(merged); */
    }
    else{
      alert("Your account number or phone number doesn't match");
    }
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
  update_User(myUpdateForm:any){
    console.log(myUpdateForm);
    this.useService.signUpUserDetails(myUpdateForm);
    //this.proService.storeProductDetailsInfo(productRef);
  }
 
}
