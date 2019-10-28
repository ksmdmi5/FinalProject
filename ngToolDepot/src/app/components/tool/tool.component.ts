import { ReviewOfLenderService } from './../../services/review-of-lender.service';
import { ToolTransactionComponent } from './../tool-transaction/tool-transaction.component';
import { ToolPhotoService } from './../../services/tool-photo.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from 'src/app/services/tool.service';
import { Tool } from 'src/app/models/tool';
import { ToolPhoto } from 'src/app/models/tool-photo';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  editTool = null;
  selected: Tool = null;
  showComplete = false;
  urlToolId: string;
  tools: Tool[] = [];
  toolPhotos: ToolPhoto[] = [];
  display: Tool = null;

  newTool = new Tool();

  constructor(private toolService: ToolService,
              private datePipe: DatePipe,
              private currentRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private photoService: ToolPhotoService,
              private transaction: ToolTransactionComponent) {}

  ngOnInit() {
    this.urlToolId = this.getCommandLineParameter();
    this.reloadTools();
  }


  checkLogin(owner): boolean {
    if (this.authService.getUsername() === owner.name) {
      return true;
    } else {
      return false;
    }
  }

  getCommandLineParameter(): string {
    let idString = '';
    if (this.currentRoute.snapshot.paramMap.get('id')) {
      idString =  this.currentRoute.snapshot.paramMap.get('id');
    }
    return idString;
  }

  showTotalTools(): number {
    const total = this.tools.length;
    return total;
  }

  displayTool(tool: Tool) {
    this.selected = tool;
    console.log(this.selected);
  }

  displayTable() {
    this.selected = null;
  }
  switchCompleted(id: number, tool: Tool) {
    if (tool.available === true) {
      tool.available = false;
    } else if (tool.available === false) {
      tool.available = true;
    }
    this.updateTool(id, tool);
  }

  addTool(form: NgForm) {
    this.newTool = new Tool();
    this.newTool = form.value;
    this.newTool.user = JSON.parse(localStorage.getItem('Object'));
    // tslint:disable-next-line: no-string-literal
    this.newTool['photos'] = [];
    this.toolService.create(this.newTool).subscribe(
      () => {
        this.reloadTools();
      },
      err => {
        console.error('toolComponent - addTool()');
        console.error(err);
      }
    );
    form.reset();
    location.reload();
  }

  setEditTool() {
    this.editTool = Object.assign({}, this.selected);
  }

  cancelEditTool() {
    this.editTool = null;
  }

  updateTool(id: number, editedTool: Tool) {

    this.toolService.update(id, editedTool).subscribe(
      () => {
        this.reloadTools();
      },
      err => {
        console.error('toolComponent - updateTool()');
        console.error(err);
      }
    );
    this.editTool = null;
    this.selected = null;
    location.reload();
  }

  deleteTool(id: number) {
    this.toolService.destroy(id).subscribe(
      () => {
        this.reloadTools();
      },
      err => {
        console.error('toolComponent - deleteTool()');
        console.error(err);
      }
    );
    this.reloadTools();
    location.reload();
  }

  reloadTools() {
    this.toolService.index().subscribe(
      lifeIsGood => {
        this.tools = lifeIsGood;
        if (this.urlToolId) {
          this.selected = this.tools.find((data => data.id === Number(this.urlToolId)));
          if (!this.selected) {
            this.router.navigateByUrl('**');
          }
        }
      },
      lifeIsBad => {
        console.error('Error in ToolComponent.reloadTools()');
        console.error(lifeIsBad);
      }
    );
  }

  redirect(tool) {
    if (this.authService.checkLogin()) {
      this.router.navigateByUrl('/toolTransaction?id=' + tool.id);
    } else {
      this.router.navigateByUrl('/login?toolId=' + tool.id);
    }
  }



  // TODO we dont need this but could utilize in a different way.
  // checkTotalTools(): string {
  //   let classColor = '';
  //   if (this.showTotalTools() >= 10) {
  //     classColor = 'badge badge-pill badge-danger';
  //   } else if (this.showTotalTools() >= 5) {
  //     classColor = 'badge badge-pill badge-warning';
  //   } else if (this.showTotalTools() < 5) {
  //     classColor = 'badge badge-pill badge-success';
  //   }
  //   return classColor;
  // }
}
