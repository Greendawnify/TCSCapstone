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
  isShopping:boolean= false;
  notShopping:boolean = true;
  signedInUserDetails:any = {};
  closeModal: string="";
  products:Product[] = new Array;
  tempCart:any[]= [];
  constructor(public productService:ProductServiceService, public userService:UserService,private modalService: NgbModal) { }
  currentBalance?:number;
  currentFunds?:string;
<<<<<<< HEAD

  userOrders: any [] = [];

=======
  userOrders:any[] = [];
>>>>>>> 66d6a05671e8d97fe1cc6f540a4eeb7132214f1d
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
  //dummy values for testinf
  // orders = [ {name:'banana',quantity:4},{name:'apple',quantity:5}]
  card = [
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
        if(c.name == addProductRef.name){
          // I am adding the same product to the list. Instead update this cart obj
          let cartQ = parseInt(c.quantity);
          cartQ += quanityNumber;
          c.quantity = cartQ.toString();
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

  showOrders(){
    let sessionString = sessionStorage.getItem("LoggedInUserDetails");
    if(sessionString){
      console.log("Got session storage");
      let userObj = JSON.parse(sessionString);
      
      

      for(let x of userObj.Orders){
        let newOrder = {
          name: userObj.fName,
          cost: x.cost,
          status: x.status,
          products: x.products
        };
        this.userOrders.push(newOrder);
      }
    }

  }

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
        let newArray;
        if(res == "Success"){

          this.userOrders = this.userOrders.filter(o => o.id != userID);
          console.log("New array", newArray);
        }
        let sessionString = sessionStorage.getItem("LoggedInUserDetails");
        if(sessionString){ console.log("Got session storage");
          let userObj = JSON.parse(sessionString); 
          userObj.Orders = this.userOrders;
          sessionStorage.setItem("LoggedInUserDetails", JSON.stringify(userObj));
          console.log('Reset sesesion storage after deelting', userObj);
        } 




        //
      })

      
    }


  checkFunds(checkoutDate:string){// take in the date info and pass to checkout to store date info
    console.log('check funds');

    let totalCost = 0;
    let checkoutProds:string[] = []

    for(let c of this.tempCart){
      let prodString = c.name + "_"+c.quantity.toString();
      checkoutProds.push(prodString);

      let cartElementPrice = c.quantity * c.price;
      totalCost+= cartElementPrice;

    }
    console.log(`Total Funds: ${totalCost} and products: ${checkoutProds}`);

    let sessionString = sessionStorage.getItem("LoggedInUserDetails");
    if(sessionString){
      console.log("Got session storage");
      let userObj = JSON.parse(sessionString);

      this.userService.checkProperFunds(userObj.autoGenID, totalCost).
    subscribe((res:any) =>{
      console.log(res.approved);
      if(res["approved"] == true){ //approved is boolean
        // fill cart with its values into the cart object inside session/local storage
        console.log("works now onto checkout");
        if(this.updateQuantities()){
          this.checkout(res.fund, totalCost, checkoutProds, userObj, checkoutDate);
        }
      }else{
        alert('You dont have the proper funds');
      }
    }, (err) => console.log(err));
    }


    
  };

  checkout(newFunds:any, totalCost:any, allProducts:string[], currentUser:any, checkoutDate:string){
    console.log('Start checkout');
    let id = currentUser.autoGenID;
    let autoGenID = currentUser.autoGenID;

    id += "_"+ Math.floor(Math.random()*10000).toString();

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
        //empty out the cart
        this.tempCart = [];
        localStorage.setItem("cart", JSON.stringify(this.tempCart));
        this.currentFunds = order.newFunds;
        //window.location.reload();
      }else{
        alert('Failed to updated funds and /or orders');
      }
    })


  };
//profile functions
triggerModal(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic'}).result.then((res) => {
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

}