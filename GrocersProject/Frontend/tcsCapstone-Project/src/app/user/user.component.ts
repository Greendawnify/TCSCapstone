import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './../product.service.service';
import { Product } from './../model.product';
import { UserService } from './../user.service';
import { Cart } from './../cart.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  addedCart="";
  isShopping:boolean= false;
  notShopping:boolean = true;
  signedInUserDetails:any = {};
  closeModal: string="";
  products:Product[] = new Array;
  tempCart:any[]= [];
  constructor(public productService:ProductServiceService, public userService:UserService,private modalService: NgbModal) { }
  currentBalance?:number;
  currentFunds?:string;

  displayText:string = "";
  interval :any;

  userOrders: any [] = [];
   
  
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => this.products = res);
    this.addedCart="";
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

      // check if I am updating the same product to the checkout list
      for(let c of oldCart){
        if(c.name == addProductRef.name){
          // update the value in the checkout cart
          // let cartQ = parseInt(c.quantity);
          // cartQ += quanityNumber;
          c.quantity = quanityNumber;
          c.price = price;

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
     this.addedCart="Added to cart"
     
  }

  // showOrders(){
  //   let sessionString = sessionStorage.getItem("LoggedInUserDetails");
  //   if(sessionString){
  //     console.log("Got session storage");
  //     let userObj = JSON.parse(sessionString);
      
      

  //     for(let x of userObj.Orders){
  //       let newOrder = {
  //         name: userObj.fName,
  //         cost: x.cost,
  //         status: x.status,
  //         products: x.products
  //       };
  //       this.userOrders.push(newOrder);
  //     }
  //   }

  // }

//delete product
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

  showOrders(){ 
    this.userOrders.length = 0;
    let sessionString = sessionStorage.getItem("LoggedInUserDetails");
     if(sessionString){ console.log("Got session storage");
      let userObj = JSON.parse(sessionString); 
      
      for(let x of userObj.Orders){
         let newOrder = { 
           name: userObj.fName,
           user:userObj.autoGenID,
           id:x.id, 
           cost: x.cost, 
           status: x.status, 
           products: x.products 
          }; 
          this.userOrders.push(newOrder); 
        } 
      } 
    }

    deleteOrder(userID:any, orderID:any){
      let newObj = {
        userID,
        orderID
      }
      this.userService.deleteOrder(newObj).subscribe(res => {
        console.log(res);
        // update product and money in backen
        if(res == "Success"){

          this.userOrders = this.userOrders.filter(o => o.id != userID);
        }
        let userObj = this.getCurrentUser();
        if(userObj){
          
          userObj.Orders = this.userOrders;
          this.setCurrentUser();
        }
      })
    }


  checkFunds(checkoutDate:string){// take in the date info and pass to checkout to store date info
    console.log('check funds');

    let totalCost = 0;
    let checkoutProds:string[] = []

    let index = 0;
    for(let c of this.tempCart){
      let prodString = c.name + "_"+c.quantity.toString();
      checkoutProds.push(prodString);

      let cartElementPrice = c.quantity * c.price;
      
      if(index ==0){
        totalCost= cartElementPrice;
      }else{
        totalCost+= cartElementPrice;
      }

      index++;
    }
    console.log(`Total Funds: ${totalCost} and products: ${checkoutProds}`);

    // let sessionString = sessionStorage.getItem("LoggedInUserDetails");
    // if(sessionString){
    //   console.log("Got session storage");
    //   let userObj = JSON.parse(sessionString);
      let oldUser = this.getCurrentUser();
      if(oldUser){

          this.userService.checkProperFunds(oldUser.autoGenID, totalCost).
        subscribe((res:any) =>{
          console.log(res.approved);
          if(res["approved"] == true){ //approved is boolean
            // fill cart with its values into the cart object inside session/local storage
            console.log("works now onto checkout");
            if(this.updateQuantities()){
              this.checkout(res.fund, totalCost, checkoutProds, oldUser, checkoutDate);
            }
          }else{
            console.log('you dont have the proper funds');
            // need to figure out have to make this dissapear
            this.displayText = "Nto enough Funds to purchase";
          }
        }, (err) => console.log(err));

      }
    //}


    
  };

  checkout(newFunds:any, totalCost:any, allProducts:string[], currentUser:any, checkoutDate:string){
    console.log('Start checkout');
    let id = currentUser.autoGenID;
    let autoGenID = currentUser.autoGenID;
    id += "_"+ Math.floor(Math.random()*10000).toString();

    if(totalCost != 0){
      let order = {
        products :allProducts,
        newFunds, // i get from check proper funds
        user:autoGenID,// should be user id
        id,//order id
        cost:totalCost,
        date:checkoutDate
      }
  
      console.log("order is", order);
      this.userService.checkout(order).
      subscribe((res:any) =>{
        if(res.funds || res.orders){
          alert('Both funds and orders have been updated.');
          let tempUserObjforFunds = this.getCurrentUser();
          this.currentBalance = tempUserObjforFunds.balance;
          this.currentFunds = tempUserObjforFunds.funds;
          //empty out the cart
          this.tempCart = [];
          localStorage.setItem("cart", JSON.stringify(this.tempCart));
          // update the user in session storage
          this.setCurrentUser();

        }else{
          alert('Failed to updated funds and /or orders');
        }
      })
    }
    else{
      alert("Your cart is Empty!");
    }
  };
//profile functions
triggerModal(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
    let tempUserObjforFunds = this.getCurrentUser();
    this.currentBalance = tempUserObjforFunds.balance;
    this.currentFunds = tempUserObjforFunds.funds;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    let tempUserObjforFunds = this.getCurrentUser();
    this.currentBalance = tempUserObjforFunds.balance;
    this.currentFunds = tempUserObjforFunds.funds;
  });
  refresh: true
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
          
          let tempUserObjforFunds = this.getCurrentUser();
          this.currentBalance = tempUserObjforFunds.balance;
          this.currentFunds = tempUserObjforFunds.funds;

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


  updateQuantities():boolean{
    let newObj;
    for(let c of this.tempCart){
      let newQuantity = parseInt(c.quantity);
      newObj = {
        id:c.name,
        quantity:newQuantity
      }
      console.log("In Updated Quantities",newObj);
      this.productService.reduceProductQuantity(newObj).subscribe((res:any) =>{
        console.log(res);
      }, (err) => console.log(err))
    }
    return true;
    // need to figure out how to check if there is not enough product quantities
  }

  getCurrentUser(){
    let sessionString = sessionStorage.getItem("LoggedInUserDetails");
    if(sessionString){
      return JSON.parse(sessionString);
    }
  }

  setCurrentUser(){
    let userObj = this.getCurrentUser();
    if(userObj){
      let newObj = {
        autoGenID: userObj.autoGenID,
        pWord:userObj.pWord
      }
      this.userService.retrieveUserById(newObj).
      subscribe(res => {
        sessionStorage.setItem("LoggedInUserDetails", JSON.stringify(res));
        this.currentBalance = userObj.balance;
        this.currentFunds = userObj.funds;
      }, (err) => console.log(err));
    }

  }

}