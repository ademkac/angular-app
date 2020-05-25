import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PhoneService } from '../phone.service';
import { Phone } from '../phone.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-phone-edit',
  templateUrl: './phone-edit.component.html',
  styleUrls: ['./phone-edit.component.css']
})
export class PhoneEditComponent implements OnInit {

  id: number;
  editMode = false;
  phoneForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private phoneService: PhoneService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  get controls(){
    return (<FormArray>this.phoneForm.get('brands')).controls;
  }

  onSubmit(){
    /* const newPhone = new Phone(
    this.phoneForm.value['name'],
    this.phoneForm.value['description'],
    this.phoneForm.value['imagePath'],
    this.phoneForm.value['brands']); */
    if(this.editMode){
      this.phoneService.updatePhone(this.id, this.phoneForm.value);
    } else {
      this.phoneService.addPhone(this.phoneForm.value);
    }
    this.onCancel();
  }

  onAddBrand(){
    (<FormArray>this.phoneForm.get('brands')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'cena': new FormControl(null, Validators.required)
      })
    )
  }


  onDeleteBrand(index: number){
    (<FormArray>this.phoneForm.get('brands')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(){
  
    let phoneName = '';
    let phoneImagePath = '';
    let phoneDescription = '';
    let phonePrice = 0;
    let phoneBrands = new FormArray([]);

    if(this.editMode){
      const phone = this.phoneService.getPhone(this.id);
      phoneName = phone.name;
      phoneImagePath = phone.imagePath;
      phoneDescription = phone.description;
      phonePrice = phone.price;
      if(phone['brands']){
        for(let brand of phone.brands){
          phoneBrands.push(
            new FormGroup({
              'name': new FormControl(brand.name, Validators.required),
              'amount': new FormControl(brand.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              'cena': new FormControl(brand.cena, Validators.required)
            })
          )
        }
      }
    }

    this.phoneForm = new FormGroup({
      'name': new FormControl(phoneName, Validators.required),
      'imagePath': new FormControl(phoneImagePath, Validators.required),
      'description': new FormControl(phoneDescription, Validators.required),
      'price': new FormControl(phonePrice, Validators.required),
      'brands': phoneBrands
    });
  }

}
