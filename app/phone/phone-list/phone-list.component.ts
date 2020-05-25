import { Component, OnInit, OnDestroy } from '@angular/core';
import { Phone } from '../phone.model';
import {PhoneService} from '../phone.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']/* ,
  providers: [FilterPipe] */
})
export class PhoneListComponent implements OnInit, OnDestroy {
  phones: Phone[];
  subscription: Subscription;
  filteredStatus:string = '';
  admin:string = '';
  


  constructor(private phoneService: PhoneService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private authService: AuthService ) {

   }
   

  ngOnInit(){
    this.dataStorageService.fetchPhones().subscribe();
    this.subscription=this.phoneService.phoneChanged.subscribe(
      (phones: Phone[]) => {
        this.phones= phones;
      }
    )
    this.phones = this.phoneService.getPhones();
     this.admin = this.authService.getAdmin(); 
    
  }

  onNewPhone(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
