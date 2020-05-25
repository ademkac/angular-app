import {EventEmitter, Injectable} from '@angular/core'
import { Brand } from '../shared/brand.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
    startedEditing = new Subject<number>();
    brandChanged = new EventEmitter<Brand[]>();
    phoneBrands: Brand[] = [];

    getBrands(){
        return this.phoneBrands.slice();
    }

    getBrand(index: number){
        return this.phoneBrands[index];
    }

    addBrand(brand: Brand){
        this.phoneBrands.push(brand);
        this.brandChanged.emit(this.phoneBrands.slice());
    }

    addBrands(brands: Brand[]){
        this.phoneBrands.push(...brands);
        this.brandChanged.emit(this.phoneBrands.slice());
    }

    updateBrand(index: number, newBrand: Brand){
        this.phoneBrands[index] = newBrand;
        this.brandChanged.emit(this.phoneBrands.slice());
    }

    deleteBrand(index: number){
        this.phoneBrands.splice(index, 1);
        this.brandChanged.emit(this.phoneBrands.slice());
    }
}