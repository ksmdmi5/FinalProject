import { ToolRental } from './../../../models/tool-rental';
import { Component, OnInit, Input } from '@angular/core';
import { Tool } from 'src/app/models/tool';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToolRentalService } from 'src/app/services/tool-rental.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-tool-rental',
  templateUrl: './update-tool-rental.component.html',
  styleUrls: ['./update-tool-rental.component.scss']
})
export class UpdateToolRentalComponent implements OnInit {
  @Input() toolRental: ToolRental;
  pickUpDate: Date;
  returnDate: Date;
  numberOfDays: number;


  constructor(
    private http: HttpClient,
    private router: Router,
    private trService: ToolRentalService
  ) { }

  ngOnInit() {

  }

  updateToolRental() {
    this.trService.update(this.toolRental.id, this.toolRental).subscribe(
      () => {
        console.log("Success updating");
      },
      err => {
        console.log(err);
      }
    )
  }

}
