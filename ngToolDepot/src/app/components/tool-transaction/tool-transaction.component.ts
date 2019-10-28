import { ReviewOfLenderService } from './../../services/review-of-lender.service';
import { User } from 'src/app/models/user';
import { ToolService } from 'src/app/services/tool.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolRental } from 'src/app/models/tool-rental';
import { ToolRentalService } from 'src/app/services/tool-rental.service';
import { Tool } from 'src/app/models/tool';
import { ReviewOfRenterService } from 'src/app/services/review-of-renter.service';
import { ReviewOfLender } from 'src/app/models/review-of-lender';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-tool-transaction',
  templateUrl: './tool-transaction.component.html',
  styleUrls: ['./tool-transaction.component.scss']
})
export class ToolTransactionComponent implements OnInit {
  toolId: number;
  tool: Tool = null;
  displayTool: Tool = null;
  listOfToolRentalsContainingTool: ToolRental[] = [];
  listOfLenderReviews: ReviewOfLender[] = [];
  averageLenderRating: number;
  averageToolRating: number;


  constructor(private toolRentalService: ToolRentalService,
              private datePipe: DatePipe,
              private currentRoute: ActivatedRoute,
              private router: Router,
              private toolService: ToolService,
              private route: ActivatedRoute
              // private confirmation: ConfirmationComponent
              ) {}

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.toolId = parseInt(this.route.snapshot.queryParamMap.get('id'));
    // console.error('transaction id ' + this.urlToolTransactionId);
    this.toolService.findById(this.toolId.toString()).subscribe(
      lifeIsGood => {
        this.displayTool = lifeIsGood;
        this.getListOfToolRentals();
      },
      lifeIsBad => {
        console.error('Error in ngOnInit.toolService.findById()');
        console.error(lifeIsBad);
      }
    );
  }

  // addToolTransaction(toolRental: ToolRental, toolId: number) {

  //   this.toolRentalService.create(toolRental, toolId).subscribe(
  //     () => {
  //       this.reloadToolTransactions();
  //     },
  //     err => {
  //       console.error('ToolTransactionComponent - addToolTransaction()');
  //       console.error(err);
  //     }
  //   );
  //   location.reload();
  // }

  // setEditToolTransaction() {
  //   this.editToolTransaction = Object.assign({}, this.selected);
  // }

  // cancelEditToolTransaction() {
  //   this.editToolTransaction = null;
  // }

  // updateToolTransaction(id: number, editedToolTransaction: ToolRental) {

  //   // TODO logic needs to be entered here

  //   this.toolRentalService.update(id, editedToolTransaction).subscribe(
  //     () => {
  //       this.reloadToolTransactions();
  //     },
  //     err => {
  //       console.error('toolTransactionComponent - updateToolTransaction()');
  //       console.error(err);
  //     }
  //   );
  //   this.editToolTransaction = null;
  //   this.selected = null;
  // }

  // deleteToolTransaction(id: number) {
  //   this.toolRentalService.destroy(id).subscribe(
  //     () => {
  //       this.reloadToolTransactions();
  //     },
  //     err => {
  //       console.error('toolTransactionComponent - deleteToolTransaction()');
  //       console.error(err);
  //     }
  //   );
  //   this.reloadToolTransactions();

  getListOfToolRentals() {
    this.toolRentalService.getToolTransactionsByTool(this.displayTool.id).subscribe(
      data => {
        this.listOfToolRentalsContainingTool = data;
        console.log(data);
      },
      err => {
        console.log(err);
        console.log('error in getLenderRating()');
      }
    )
  }
  //   var totalToolRating = 0;
  //   var totalLenderRating = 0;
  //   for (let toolRental of this.listOfToolRentalsContainingTool) {
  //     console.log("HELLO");
  //     console.log(toolRental.renterReview.toolRating);
  //     console.log(toolRental.renterReview.lenderRating);
  //   }
  //   this.averageLenderRating = totalLenderRating / this.listOfLenderReviews.length;
  //   this.averageToolRating = totalToolRating / this.listOfLenderReviews.length;
  // }
}
