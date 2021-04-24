import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './../product.service.service';
import { Product } from './../model.product';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  products:Product[] = new Array;
  constructor(public productService:ProductServiceService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => this.products = res);
  }

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
}