import { Component, OnInit, Output, Input } from '@angular/core';

import {Brand} from '../shared/brand.model';
import { ShoppingListService } from './shopping-list.service';
import { Phone } from '../phone/phone.model';
import { PhoneService } from '../phone/phone.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  phoneBrands: Brand[];
  cartTotal: number = 0;
  
 
  constructor(private slService: ShoppingListService) { }

  ngOnInit(){
    this.slService.brandChanged.subscribe(
      (brands: Brand[])=>{
        this.phoneBrands = brands;
        console.log(this.phoneBrands)
        this.calcCartTotal()
      }
    );
    
    this.phoneBrands=this.slService.getBrands();
    console.log(this.phoneBrands)
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  calcCartTotal(){
    this.cartTotal = 0;
    this.phoneBrands.forEach(item=> {
      this.cartTotal += (item.amount * item.cena)
      /* console.log(item.cena)
      console.log(item.amount) */
      console.log(this.cartTotal)
    })
    return this.cartTotal;
  }

}
