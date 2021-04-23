import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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