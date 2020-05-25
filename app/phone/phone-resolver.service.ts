import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Phone } from './phone.model';
import { DataStorageService } from '../shared/data-storage.service';
import { PhoneService } from './phone.service';

@Injectable({providedIn:'root'})
export class PhoneResolverService implements Resolve<Phone[]> {
    constructor(private dataStorageService: DataStorageService, private phoneService: PhoneService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const phones = this.phoneService.getPhones();

        if(phones.length === 0){
            return this.dataStorageService.fetchPhones();
        } else {
            return phones;
        }
        
    }
}