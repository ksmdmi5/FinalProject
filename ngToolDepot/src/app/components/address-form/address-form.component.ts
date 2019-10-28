import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  address: Address = new Address();
  user: User = new User();
  hasAddress: boolean = false;
  selectedState: string = '';

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('Object'));
    if (this.user.address.street) {
      this.address = this.user.address;
      this.selectedState = this.address.state;
      this.hasAddress = true;
    }
  }

}
