import { ToolPhoto } from 'src/app/models/tool-photo';
import { Component, OnInit } from '@angular/core';
import { ToolPhotoService } from 'src/app/services/tool-photo.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolphoto',
  templateUrl: './toolphoto.component.html',
  styleUrls: ['./toolphoto.component.scss']
})
export class ToolphotoComponent implements OnInit {

  editTool = null;
  selected: ToolPhoto = null;
  urlToolId: string;
  toolPhotos: ToolPhoto[] = [];

  newTool = new ToolPhoto();

  constructor(private photoService: ToolPhotoService,
              private currentRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.urlToolId = this.getCommandLineParameter();
    this.reloadToolPhotos();
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
      idString = this.currentRoute.snapshot.paramMap.get('id');
    }
    return idString;
  }

  showTotalTools(): number {
    const total = this.toolPhotos.length;
    return total;
  }

  displayTool(toolPhoto: ToolPhoto) {
    this.selected = toolPhoto;
    console.log(this.selected);
  }

  displayTable() {
    this.selected = null;
  }

  switchCompleted(id: number, toolPhoto: ToolPhoto) {
    this.updateTool(id, toolPhoto);
  }

  // addToolPhoto(form: NgForm) {
  //   this.newToolPhoto = new ToolPhoto();
  //   this.newToolPhoto = form.value;
  //   // tslint:disable-next-line: no-string-literal
  //   this.newTool['photos'] = [];
  //   this.toolService.create(this.newToolPhoto).subscribe(
  //     () => {
  //       this.reloadToolPhotos();
  //     },
  //     err => {
  //       console.error('toolComponent - addTool()');
  //       console.error(err);
  //     }
  //   );
  //   form.reset();
  //   location.reload();
  // }

  setEditTool() {
    this.editTool = Object.assign({}, this.selected);
  }

  cancelEditTool() {
    this.editTool = null;
  }

  updateTool(id: number, editedToolPhoto: ToolPhoto) {

    this.photoService.update(id, editedToolPhoto).subscribe(
      () => {
        this.reloadToolPhotos();
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
    this.photoService.destroy(id).subscribe(
      () => {
        this.reloadToolPhotos();
      },
      err => {
        console.error('toolComponent - deleteTool()');
        console.error(err);
      }
    );
    this.reloadToolPhotos();
    location.reload();
  }

  reloadToolPhotos() {
    this.photoService.index().subscribe(
      lifeIsGood => {
        this.toolPhotos = lifeIsGood;
        if (this.urlToolId) {
          this.selected = this.toolPhotos.find((data => data.id === Number(this.urlToolId)));
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
}
