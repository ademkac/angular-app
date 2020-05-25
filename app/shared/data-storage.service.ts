import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PhoneService } from '../phone/phone.service';
import { Phone } from '../phone/phone.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private phoneService: PhoneService,
        ){}

    storePhones(){
        const phones = this.phoneService.getPhones();
         this.http
         .put('https://prodaja-telefona.firebaseio.com/phones.json', phones)
         .subscribe(response => {
             console.log(response);
         }   
         );
    }

    fetchPhones(){
        return this.http.get<Phone[]>('https://prodaja-telefona.firebaseio.com/phones.json').pipe(
            map(phones => {
                return phones.map(phone => {
                    return {
                        ...phone,
                        brands: phone.brands ? phone.brands : []
                    };
                });
            }),
            tap(phones => {
                this.phoneService.setPhones(phones);
            })
        )
    }
}