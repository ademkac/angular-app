import { Brand } from '../shared/brand.model';

export class Phone {
    
    public name: string;
    public description: string;
    public price: number
    public imagePath: string;
    public brands: Brand[];

    constructor( name: string, desc: string, pri: number , imagePath: string, brands: Brand[]){
        
        this.name = name;
        this.description = desc;
        this.price = pri;
        this.imagePath = imagePath;
        this.brands = brands;
    }
}