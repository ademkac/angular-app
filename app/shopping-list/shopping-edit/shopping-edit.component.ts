import { 
  Component,
  OnInit,
  OnDestroy,
  ViewChild
 } from '@angular/core';

import {Brand} from '../../shared/brand.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PhoneService } from 'src/app/phone/phone.service';
import { Phone } from 'src/app/phone/phone.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 @ViewChild('f' , {static: false} ) slForm: NgForm; 
  subscription: Subscription;
 editMode = false;
 editedItemIndex: number;
 editedItem: Brand;
 tel: Phone;


  constructor(private slService: ShoppingListService, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getBrand(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          cena: this.editedItem.cena
        })
      }
    );
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newBrand = new Brand(value.name, value.amount, value.cena );
    if(this.editMode){
      this.slService.updateBrand(this.editedItemIndex, newBrand);
    } else {
      this.slService.addBrand(newBrand);
    }
    this.editMode = false;
    form.reset();

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteBrand(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
