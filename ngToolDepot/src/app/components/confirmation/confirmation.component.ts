import { Component, OnInit, Input } from "@angular/core";
import { ToolRentalService } from "src/app/services/tool-rental.service";
import { ToolRental } from "src/app/models/tool-rental";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Tool } from "src/app/models/tool";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"]
})
export class ConfirmationComponent implements OnInit {
  toolTransactions: ToolRental[] = [];
  urlToolTransactionId: string;
  display: ToolRental;
  selected = null;

  constructor(
    private toolRentalService: ToolRentalService,
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.urlToolTransactionId = this.currentRoute.snapshot.queryParamMap.get('id');
    // console.log(this.currentRoute.snapshot.queryParamMap.get('id'));
    // this.currentRoute.queryParams.subscribe(params => {
    //   this.urlToolTransactionId = params['id'];
    // });
    this.urlToolTransactionId = this.currentRoute.snapshot.queryParamMap.get(
      "id"
    );
    // console.error('transaction id ' + this.urlToolTransactionId);
    this.toolRentalService.findById(+this.urlToolTransactionId).subscribe(
      lifeIsGood => {
        this.display = lifeIsGood;
        console.log(this.display);
      },
      lifeIsBad => {
        console.error("Error in ngOnInit.confirmation");
        console.error(lifeIsBad);
      }
    );
  }

  getCommandLineParameter(): string {
    let idString = "";
    if (this.currentRoute.snapshot.paramMap.get("id")) {
      idString = this.currentRoute.snapshot.paramMap.get("id");
      console.log(idString);
    }
    return idString;
  }
}
