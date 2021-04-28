import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './../product.service.service';
import { Product } from './../model.product';
import { UserService } from './../user.service';
import { Cart } from './../cart.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isShopping:boolean= false;
  notShopping:boolean = true;
  signedInUserDetails:any = {};
  closeModal: string="";
  products:Product[] = new Array;
  tempCart:any[]= [];
  constructor(public productService:ProductServiceService, public userService:UserService,private modalService: NgbModal) { }
  currentBalance?:number;
  currentFunds?:string;
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => this.products = res);

    let cart:string|null;
     cart = localStorage.getItem('cart');

     if(cart){
       this.tempCart = JSON.parse(cart);
     }

     // Get storage of users
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

      this.currentBalance = this.signedInUserDetails.balance;
      this.currentFunds = this.signedInUserDetails.funds;
  }
  is_Shopping(){
    this.isShopping=true;
    this.notShopping=false;
  }
  orders = [ {name:'banana',quantity:4},{name:'apple',quantity:5}]
  cards = [
    {
      name: 'Banana',
      quantity: 6,
      cost:"$12",
      img: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg'
    },
    {
      name: ' Strawberries',
      quantity: 5,
      cost:"$12",
      img: 'https://farmfreshcarolinas.com/wp-content/uploads/2020/04/Strawberries.jpg'
    },
    {
      name: 'Mangoes',
      quantity: 7,
      cost:"$12",
      img: 'https://plantogram.com/wa-data/public/shop/products/55/06/655/images/1256/1256.750@2x.jpg'
    },
    {
      name: 'Card Title 4',
      quantity: 15,
      cost:"$12",
      img: 'https://static.libertyprim.com/files/familles/peche-large.jpg'
    },

  ];

  // add functionality if the name of this new order is the same as a previous order to add to the quanitity and cost of previous order
  // and dont append a new object to the cart
  addProduct(addProductRef:any, quantity:string){
    let cart:string|null;
     cart = localStorage.getItem('cart');

     let id = Math.floor(Math.random() * 10000).toString() + addProductRef.name + addProductRef.cost.toString();
     let quanityNumber = parseInt(quantity);
     let price = addProductRef.cost * quanityNumber;

     let newObj ={
       id,
      name:addProductRef.name,
      price,
      quantity
      // more paramters later
    }

    let jsonString = "";

     if(!cart){
       // create cart object and add to it
       let cartObjs = [];
       cartObjs.push(newObj);

       this.tempCart = cartObjs;

       jsonString = JSON.stringify(cartObjs);

     }else{
      let oldCart = JSON.parse(cart);

      // check if I am adding the same product to the checkout list
      for(let c of oldCart){
        if(c.name = addProductRef.name){
          // I am adding the same product tot he list. Instead update this cart obj
          c.quanitity += quanityNumber;
          c.price += price;

          this.tempCart = oldCart;
          localStorage.setItem('cart', JSON.stringify(oldCart));
          console.log("Temp cart after updating", this.tempCart);
          return;
        }
      }

      oldCart.push(newObj);

      this.tempCart = oldCart;
      jsonString = JSON.stringify(oldCart);

     }

     localStorage.setItem('cart', jsonString);
     console.log("Temp cart after adding", this.tempCart);
     
  }

  deleteProduct(deleteID:any){
    let cart:string|null;
     cart = localStorage.getItem('cart');

     if(!cart){
       console.error('There is no cart to delete from');
       return;
     }

     let oldCart = JSON.parse(cart);

     let newCart = oldCart.filter((product: { id: any; }) =>{
       if(product.id == deleteID){
         console.log("Product ID is: ", product.id);
         console.log("Delet Product DI is: ", deleteID);
         return false;
       }else{
         return  true;
       }
     });

     console.log("New cart after deleting", newCart);

     this.tempCart = newCart;

     localStorage.setItem('cart', JSON.stringify(newCart));
  }

  editProfile(profileRef:any){
    console.log(profileRef);
    this.userService.updateProfile(profileRef).subscribe((res:string) => console.log(res))
  }

  updateFunds(fundsRef:any){

    this.userService.updateFunds(fundsRef).subscribe((res:any) =>{
      console.log(res);
      if(res.approved == true){
        // database funds have been nupdated and can be properly displayed
      }
    })
  };

  checkFunds(id:string, cost:number){
    this.userService.checkProperFunds(id, cost).
    subscribe((res:any) =>{
      if(res.approved == true){
        // fill cart with its values into the cart object inside session/local storage
      }
    });
  };

  checkout(){
    // get cart object from session storiage/local storage
    let cart = {
      user:"123",
      newFunds:70,
      products:["apple", "apple"],
      cost: 30
    }

    this.userService.checkout(cart).
    subscribe((res:any) =>{
      if(res.funds && res.orders){
        console.log('both funds and orders have been updated.');
      }else{
        console.log('failed to updated funds and /or orders');
      }
    })


    // need to implement subtracting quantity from database
  };
//profile functions
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
  this.userService.signUpUserDetails(myUpdateForm);
  //this.proService.storeProductDetailsInfo(productRef);
}

//profile functions
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
  this.userService.updateProfile(merged).subscribe((result:string)=> {
    let tempResult = JSON.stringify(merged);
    console.log("Temp Result after updating user ", tempResult);
    sessionStorage.setItem('LoggedInUserDetails', tempResult);
    alert(result);
  });
  //console.log();
}

updateUserFunds(myUpdateFundsForm:any){
  console.log("Update User Funds is called:", myUpdateFundsForm);
  
  let tempUserFundsDetails =  sessionStorage.getItem("LoggedInUserDetails");
  let TFD:any = {};
  console.log(tempUserFundsDetails);
  if(tempUserFundsDetails != null){
    tempUserFundsDetails = JSON.parse(tempUserFundsDetails);
    console.log("Type and Result:" , typeof(tempUserFundsDetails) , " ", tempUserFundsDetails);
    TFD = tempUserFundsDetails;
    //console.log("Type and Result:" , typeof(this.signedInUserDetails) , " ", this.signedInUserDetails);
  }
  else{
    console.log("tempUserFundsDetails is null");
  }

  if(TFD.actNum == myUpdateFundsForm.actNum || TFD.phoneNum == myUpdateFundsForm.phoneNum){
    if(TFD.balance != 0){

      if(myUpdateFundsForm.fundsToAdd < TFD.balance){

        let tempFunds = parseInt(TFD.funds) + parseInt(myUpdateFundsForm.fundsToAdd);
        let remainingBalance = TFD.balance - myUpdateFundsForm.fundsToAdd;
        let tempFundsObj = { "funds": tempFunds, "balance": remainingBalance };
        console.log(tempFundsObj);
        let merged = {...TFD, ...tempFundsObj};
        console.log(merged);

        this.userService.updateProfile(merged).subscribe((result:string)=> {
          let tempResult = JSON.stringify(merged);
          console.log("Temp Result after updating user funds ", tempResult);
          sessionStorage.setItem('LoggedInUserDetails', tempResult);
          this.currentBalance = merged.balance;
          this.currentFunds = merged.funds;
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


}