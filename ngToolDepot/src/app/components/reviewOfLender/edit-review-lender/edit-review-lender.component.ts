import { Component, OnInit, Input } from '@angular/core';
import { ReviewOfLender } from 'src/app/models/review-of-lender';
import { ReviewOfLenderService } from 'src/app/services/review-of-lender.service';
import { ToolTransactionComponent } from '../../tool-transaction/tool-transaction.component';
import { ToolRental } from 'src/app/models/tool-rental';

@Component({
  selector: 'app-edit-review-lender',
  templateUrl: './edit-review-lender.component.html',
  styleUrls: ['./edit-review-lender.component.scss']
})
export class EditReviewLenderComponent implements OnInit {
@Input() toolTransaction: ToolRental;

@Input() reviewOfLender: ReviewOfLender;

reviewToBeUpdated: ReviewOfLender = new ReviewOfLender();

  currentRating = 0;

  constructor(private reviewOfLenderSvc: ReviewOfLenderService, private toolTransactionComp: ToolTransactionComponent) { }

  ngOnInit() {
  }

  getReviewOfLender() {
    this.reviewOfLenderSvc.index(this.toolTransaction.id).subscribe(
      data => {
        this.reviewToBeUpdated = data;
        this.currentRating = this.reviewToBeUpdated.renterRating;
      },
      err => {
        console.error('Error in update-ROL - getReviewOfLender()');
        console.error(err);
      }
    );
  }

  updateReviewOfLender() {
    this.reviewToBeUpdated.renterRating = this.currentRating;
    this.reviewOfLenderSvc.update(this.toolTransaction.id,
      this.reviewOfLender.id, this.reviewToBeUpdated).subscribe(
      () => {
        console.log('review of lender successful edit');
      },
      err => {
        console.error('error updating review of lender in comp');
        console.error(err);
      }
    );
  }
}
