import { Component, OnInit, Input } from '@angular/core';

import {Phone} from '../../phone.model';


@Component({
  selector: 'app-phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.css']
})
export class PhoneItemComponent implements OnInit {
  @Input() phone: Phone;
  @Input() index: number;

  

  ngOnInit() {
  }

 

}
