import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allUsers: User [] = [];

  constructor(private userComp: UserComponent) { }

  ngOnInit() {
    this.allUsers = this.userComp.getAllUsers();
  }

}
