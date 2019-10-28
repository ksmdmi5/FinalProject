import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { ToolRentalService } from 'src/app/services/tool-rental.service';
import { ToolRental } from './../../../models/tool-rental';
import { Component, OnInit, Input } from '@angular/core';
import { Tool } from 'src/app/models/tool';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-tool-rental',
  templateUrl: './add-tool-rental.component.html',
  styleUrls: ['./add-tool-rental.component.scss']
})
export class AddToolRentalComponent implements OnInit {
  @Input() tool: Tool;
  private url = environment.baseUrl + 'api/tool';
  toolToBeRented: Tool = new Tool();
  pickUpDate: Date;
  numberOfDays: number;
  newToolRental: ToolRental = new ToolRental();


  constructor(
    private http: HttpClient,
    private router: Router,
    private trService: ToolRentalService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }
  getTool() {
    this.http.get<Tool>(this.url + '/' + this.tool.id).subscribe(
      data => {
        this.toolToBeRented = data;
      },
      err => {
        console.error('Error in update-tool - getTool()');
        console.log(this.tool);
        console.error(err);
      }
    );
  }

  createToolRental() {
    this.newToolRental.checkout = this.pickUpDate;
    this.newToolRental.totalCost = this.tool.costPerDay * this.numberOfDays;
    this.trService.create(this.newToolRental, this.tool.id).subscribe(
      data => {
        this.newToolRental = data;
        this.router.navigateByUrl('/confirmation/?id=' + this.newToolRental.id);
      },
      err => {
        console.log(err);
      }
    );
  }

  checkLoggedInUser(): boolean {
    if (this.authService.checkLogin()) {
      return true;
    } else {
      return false;
    }
  }
}
