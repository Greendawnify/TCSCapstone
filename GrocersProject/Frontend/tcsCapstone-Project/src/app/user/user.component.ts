import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './../product.service.service';
import { Product } from './../model.product';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isShopping:boolean= false;
  notShopping:boolean = true;
  

  products:Product[] = new Array;
  constructor(public productService:ProductServiceService, public userService:UserService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => this.products = res);
  }
  is_Shopping(){
    this.isShopping=true;
    this.notShopping=false;
  }
  orders = [ {name:'banana',quantity:4},{name:'apple',quantity:5}]
  cards = [
    {
      title: 'Banana',
      description: 'Quality banana from NY',
      img: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg'
    },
    {
      title: ' Strawberries',
      description: 'Strawberries from TX',
      
      img: 'https://farmfreshcarolinas.com/wp-content/uploads/2020/04/Strawberries.jpg'
    },
    {
      title: 'Mangoes',
      description: 'Organic Mangoes ',
      
      img: 'https://plantogram.com/wa-data/public/shop/products/55/06/655/images/1256/1256.750@2x.jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Organic peach',
      
      img: 'https://static.libertyprim.com/files/familles/peche-large.jpg'
    },

  ];

  addProduct(addProductRef:any){
    let cart:string|null;
     cart = localStorage.getItem('cart');

     let id = Math.floor(Math.random() * 10000).toString() + addProductRef.name + addProductRef.price.toString();

     let newObj ={
       id,
      name:addProductRef.name,
      price:addProductRef.price,
      // more paramters later
    }

    let jsonString = "";

     if(!cart){
       // create cart object and add to it
       let cartObjs = [];
       cartObjs.push(newObj);

       jsonString = JSON.stringify(cartObjs);

     }else{
      let oldCart = JSON.parse(cart);

      oldCart.push(newObj);

      jsonString = JSON.stringify(oldCart);

     }

     localStorage.setItem('cart', jsonString);
     
  }

  deleteProduct(deleteProudctRef:any){
    let cart:string|null;
     cart = localStorage.getItem('cart');

     if(!cart){
       console.error('There is no cart to delete from');
       return;
     }

     let oldCart = JSON.parse(cart);

     let newCart = oldCart.filter((product: { id: any; }) =>{
       if(product.id == deleteProudctRef.id){
         return true;
       }else{
         return false;
       }
     });

     console.log("New cart after deleting", newCart);

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


  };

}