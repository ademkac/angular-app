import { Injectable} from '@angular/core';

import {Phone} from './phone.model';
import { Brand } from '../shared/brand.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class PhoneService {
    phoneChanged = new Subject<Phone[]>();

   /* private phones: Phone[] = [
        new Phone('test',
         'test',
          '../../assets/samsung.jpg',
          [
              new Brand('Motorola', 3),
              new Brand('Nokia', 4)
          ]),
        new Phone('testing',
         'testing',
          '../../assets/samsung.jpg',
          [
              new Brand('Iphone', 3)
          ])
      ]; */

      private phones: Phone[] = [];

      constructor(private slService: ShoppingListService){}

    setPhones(phones: Phone[]){
        this.phones = phones;
        this.phoneChanged.next(this.phones.slice());
    }  

    getPhones(){
        return this.phones.slice();
    }

    getPhone(index: number){
        return this.phones[index];
    }

    addBrandsToShoppingList(index: number, brands: Brand[]){
        this.slService.addBrands(brands);
        this.getPhone(index);
    }

    addPhone(phone: Phone){
        this.phones.push(phone);
        this.phoneChanged.next(this.phones.slice());
    }

    updatePhone(index: number, newPhone: Phone){
        this.phones[index] = newPhone;
        this.phoneChanged.next(this.phones.slice());
    }

    deletePhone(index: number){
        this.phones.splice(index, 1);
        this.phoneChanged.next(this.phones.slice());
    }
    
}