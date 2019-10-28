import { ToolRentalService } from './../../../services/tool-rental.service';
import { Component, OnInit, Input } from "@angular/core";
import { Tool } from 'src/app/models/tool';
import { AuthService } from 'src/app/services/auth.service';
import { ToolRental } from 'src/app/models/tool-rental';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-delete-tool-rental",
  templateUrl: "./delete-tool-rental.component.html",
  styleUrls: ["./delete-tool-rental.component.scss"]
})
export class DeleteToolRentalComponent implements OnInit {
  @Input() toolRental: ToolRental;
  toolToBeDeleted: Tool = new Tool();
  constructor(
    private toolRentalService: ToolRentalService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit() {
    console.log(this.toolRental.id);
  }

  delete() {
    this.toolRentalService.destroy(this.toolRental.id).subscribe(
      () => {
        console.log("Success deleting");
        location.reload();
      },
      err => {
        console.error("delete-tool - delete()");
        console.error(err);
      }
    );
  }
}
