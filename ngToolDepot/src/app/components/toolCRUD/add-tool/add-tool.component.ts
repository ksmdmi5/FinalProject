import { NavigationComponent } from './../../navigation/navigation.component';
import { ToolPhotoService } from './../../../services/tool-photo.service';
import { ToolPhoto } from './../../../models/tool-photo';
import { ToolService } from './../../../services/tool.service';
import { ToolComponent } from './../../tool/tool.component';
import { UserComponent } from './../../user/user.component';
import { log } from 'util';
import { Tool } from './../../../models/tool';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.scss']
})
export class AddToolComponent implements OnInit {
  @Input() user: User;
  newTool: Tool = new Tool();
  photoUrl: string;
  photo: ToolPhoto = new ToolPhoto();
  constructor(private userComp: UserComponent, private toolService: ToolService, private toolPhotoService: ToolPhotoService) { }

  ngOnInit() {
  }

  addTool(form: NgForm) {
    // console.log(form.value);
    this.newTool = form.value;
    this.newTool.photos = [];
    this.photo.photoUrl = this.photoUrl;
    this.newTool.photos.push(this.photo);
    this.newTool.rentals = [];
    console.log(this.newTool);
    this.toolService.create(this.newTool).subscribe(
      data => {
        console.log("Success");
      },
      err => {
        console.log(err);
      }
    );
  }
}
