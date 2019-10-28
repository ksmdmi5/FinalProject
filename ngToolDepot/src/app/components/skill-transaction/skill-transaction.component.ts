import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolRental } from 'src/app/models/tool-rental';
import { ToolRentalService } from 'src/app/services/tool-rental.service';
import { SkillRental } from 'src/app/models/skill-rental';
import { SkillRentalService } from 'src/app/services/skill-rental.service';

@Component({
  selector: 'app-skill-transaction',
  templateUrl: './skill-transaction.component.html',
  styleUrls: ['./skill-transaction.component.scss']
})
export class SkillTransactionComponent implements OnInit {
  editSkillTransaction = null;
  selected = null;
  showComplete = false;
  urlSkillTransactionId: string;
  skillTransactions: SkillRental[] = [];

  newSkillTransaction = new SkillRental();

  constructor(private skillRentalService: SkillRentalService,
              private datePipe: DatePipe,
              private currentRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.urlSkillTransactionId = this.getCommandLineParameter();
    this.reloadSkillTransactions();
  }

  getCommandLineParameter(): string {
    let idString = '';
    if (this.currentRoute.snapshot.paramMap.get('id')) {
      idString =  this.currentRoute.snapshot.paramMap.get('id');
    }
    return idString;
  }

  showTotalSkillTransactions(): number {
    const total = this.skillTransactions.length;
    return total;
  }

  displaySkillTransactions(skillTransaction: SkillRental) {
    this.selected = skillTransaction;
  }

  displayTable() {
    this.selected = null;
  }

  // setFinishDate(id: number, skillTransaction: SkillRental) {
  //   if (skillTransaction.finishDate === null) {
  //     skillTransaction.finishDate = new Date().toDateString();
  //   }
  //   this.updateSkillTransaction(id, skillTransaction);
  // }

  addSkillTransactions(form: NgForm) {
    this.newSkillTransaction = new SkillRental();

    // TODO need logic entered here.

    this.skillRentalService.create(this.newSkillTransaction).subscribe(
      () => {
        this.reloadSkillTransactions();
      },
      err => {
        console.error('SkillTransactionComponent - addSkillTransaction()');
        console.error(err);
      }
    );
    form.reset();
  }

  setEditSkillTransaction() {
    this.editSkillTransaction = Object.assign({}, this.selected);
  }

  cancelEditSkillTransaction() {
    this.editSkillTransaction = null;
  }

  updateSkillTransaction(id: number, editedSkillTransaction: SkillRental) {

    // TODO logic needs to be entered here

    this.skillRentalService.update(id, editedSkillTransaction).subscribe(
      () => {
        this.reloadSkillTransactions();
      },
      err => {
        console.error('skillTransactionComponent - updateSkillTransaction()');
        console.error(err);
      }
    );
    this.editSkillTransaction = null;
    this.selected = null;
  }

  deleteSkillTransaction(id: number) {
    this.skillRentalService.destroy(id).subscribe(
      () => {
        this.reloadSkillTransactions();
      },
      err => {
        console.error('skillTransactionComponent - deleteSkillTransaction()');
        console.error(err);
      }
    );
    this.reloadSkillTransactions();
  }

  reloadSkillTransactions() {
    this.skillRentalService.index().subscribe(
      lifeIsGood => {
        this.skillTransactions = lifeIsGood;
        if (this.urlSkillTransactionId) {
          this.selected = this.skillTransactions.find((data => data.id === Number(this.urlSkillTransactionId)));
          if (!this.selected) {
            this.router.navigateByUrl('**');
          }
        }
      },
      lifeIsBad => {
        console.error('Error in skillTransactionComponent.reloadSkillTransactions()');
        console.error(lifeIsBad);
      }
    );
  }


  // TODO we dont need this but could utilize in a different way.

  // checkTotalSkillTransactions(): string {
  //   let classColor = '';
  //   if (this.showTotalSkillTransactions() >= 10) {
  //     classColor = 'badge badge-pill badge-danger';
  //   } else if (this.showTotalSkillTransactions() >= 5) {
  //     classColor = 'badge badge-pill badge-warning';
  //   } else if (this.showTotalSkillTransactions() < 5) {
  //     classColor = 'badge badge-pill badge-success';
  //   }
  //   return classColor;
  // }
}
