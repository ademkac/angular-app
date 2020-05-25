import { Component, OnInit } from '@angular/core';

import {Phone} from '../phone.model';
import { PhoneService } from '../phone.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit {
  phone: Phone;
  id: number;
  userID:string = '';

  constructor(private phoneService: PhoneService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.phone = this.phoneService.getPhone(this.id);
      }
    )
      this.userID= this.authService.getAdmin();
  }

  onAddToShoppingList(){
    this.phoneService.addBrandsToShoppingList(this.id, this.phone.brands);
  }

  onEditPhone(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePhone(){
    this.phoneService.deletePhone(this.id);
    this.router.navigate(['/phones']);
  }

}
