import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToolService } from 'src/app/services/tool.service';
import { Tool } from './../../../models/tool';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-tool',
  templateUrl: './update-tool.component.html',
  styleUrls: ['./update-tool.component.scss']
})
export class UpdateToolComponent implements OnInit {
  @Input() user: User;

  @Input() tool: Tool;
  private url = environment.baseUrl + 'api/tool';
  toolToBeUpdated: Tool = new Tool();
  constructor(private toolService: ToolService, private http: HttpClient) { }

  ngOnInit() {

  }
  getTool() {
    this.http.get<Tool>(this.url + '/' + this.tool.id).subscribe(
      data => {
        this.toolToBeUpdated = data;
      },
      err => {
        console.error('Error in update-tool - getTool()');
        console.error(err);
      }
    );
  }

  updateTool() {
    console.log(this.toolToBeUpdated);
    console.log(this.tool.id);
    this.toolService.update(this.tool.id, this.toolToBeUpdated).subscribe(
      () => {
        console.log('Success editing');
        location.reload();
      },
      err => {
        console.error('Error in update-tool - updateTool');
        console.error(err);
      }
    );
  }
}
