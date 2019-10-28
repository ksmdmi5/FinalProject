import { NavigationComponent } from './../navigation/navigation.component';
import { ToolRentalService } from 'src/app/services/tool-rental.service';
import { AuthService } from './../../services/auth.service';
import { ToolTransactionComponent } from './../tool-transaction/tool-transaction.component';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToolService } from 'src/app/services/tool.service';
import { ToolRental } from 'src/app/models/tool-rental';
import { Tool } from 'src/app/models/tool';
import {
  AfterViewInit,
  OnInit,
  Component,
  AfterContentInit
} from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterContentInit {
  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private toolService: ToolService,
    private router: Router,
    private authService: AuthService,
    // private tool: Tool,
    private toolRentalService: ToolRentalService
  ) {}

  editUser = null;
  selected = null;
  loggedInUser: User = new User();
  showComplete = false;
  urlUserId: string;
  users: User[] = [];
  newUser = new User();
  toolTransactions: ToolRental[] = [];
  myTools: Tool[] = [];
  allTools: Tool[] = [];
  myToolRentals: ToolRental[] = [];
  myToolLoans: ToolRental[] = [];
  imageUrl: string = '';
  admin: boolean = false;
  // 'use strict';
  // tslint:disable-next-line: max-line-length
  states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

  ngOnInit() {
    // this.urlUserId = this.getCommandLineParameter();
    // this.reloadUsers();

    // this.loggedInUser = this.authService.returnUser();
    this.loggedInUser = JSON.parse(localStorage.getItem('Object'));
  }

  ngAfterContentInit() {
    // this.setLoggedInUser();
    if (localStorage.getItem('role') === 'admin') {
      this.reloadUsers();
      this.admin = true;
      // this.getLoggedInUserTransactions();
      // this.getLoggedInUserTools();
    } else if (localStorage.getItem('role') === 'user') {
      // this.getLoggedInUserTransactions();
      // this.getLoggedInUserTools();
    }
    this.loggedInUser = JSON.parse(localStorage.getItem('Object'));
  }

  getAllUsers() {
    this.reloadUsers();
    return [...this.users];
  }

  getLoggedInUserTransactions() {
    this.myToolRentals = [];
    this.myToolLoans = [];
    const userName = this.authService.getUsername();
    this.toolRentalService.getToolTransactionsByUserName(userName).subscribe(
      data => {
        this.toolTransactions = data;
        this.toolTransactions.forEach(toolTransaction => {
          if (toolTransaction.id !== 0) {
            if (this.loggedInUser.id === toolTransaction.renter.id) {
              this.myToolRentals.push(toolTransaction);
            } else {
              this.myToolLoans.push(toolTransaction);
            }
          }
          });
      },
      err => {
        console.error(err);
      }
    );
  }

  //   setLoggedInUser() {
  //     this.userService.getUserByUsername().subscribe(
  //       data => {
  //         console.error(data + '   ******************** DATA IN USER COMP');
  //         this.loggedInUser = data;
  //         console.error(this.loggedInUser + '   ******************** loggedInUser IN USER COMP');
  //       },
  //       err => {
  //         console.error(err);
  //         console.error('error in user component.setLoggedInUser');
  //       }
  //       );
  //     }

  getAllTools() {
    this.toolService.index().subscribe(
      data => {
        this.allTools = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  getLoggedInUserTools() {
    const userName = this.authService.getUsername();
    this.toolService.getToolListByUserName(userName).subscribe(
      data => {
        this.myTools = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  getCommandLineParameter(): string {
    let idString = '';
    if (this.currentRoute.snapshot.paramMap.get('id')) {
      idString = this.currentRoute.snapshot.paramMap.get('id');
    }
    return idString;
  }

  showTotalUsers(): number {
    const total = this.users.length;
    return total;
  }

  displayUser(user: User) {
    this.selected = user;
  }

  displayTable() {
    this.selected = null;
  }

  switchCompleted(id: number, user: User) {
    if (user.enabled === true) {
      user.enabled = false;
    } else if (user.enabled === false) {
      user.enabled = true;
    }
    this.updateUser(id);
  }

  addUser(form: NgForm) {
    this.newUser = new User();

    // TODO need logic entered here.

    this.userService.create(this.newUser).subscribe(
      () => {
        this.reloadUsers();
      },
      err => {
        console.error('userComponent - addUser()');
        console.error(err);
      }
    );
    form.reset();
  }

  setEditUser() {
    this.editUser = Object.assign({}, this.selected);
  }

  cancelEditUser() {
    this.editUser = null;
  }

  updatePhoto() {
    this.loggedInUser.photo = this.imageUrl;
    this.updateUser(this.loggedInUser.id);
  }

  returnRole(): string {
    return localStorage.getItem('role');
  }

  updateUser(id: number) {
    // TODO logic needs to be entered here

    this.userService.update(id, this.loggedInUser).subscribe(
      () => {
      },
      err => {
        console.error('userComponent - updateUser()');
        console.error(err);
      }
    );
    this.editUser = null;
    this.selected = null;
  }

  deleteUser(id: number) {
    this.userService.destroy(id).subscribe(
      () => {
        this.reloadUsers();
      },
      err => {
        console.error('userComponent - deleteUser()');
        console.error(err);
      }
    );
    this.reloadUsers();
  }

  reloadUsers() {
    this.userService.index().subscribe(
      lifeIsGood => {
        this.users = lifeIsGood;
        // if (this.urlUserId) {
        //   this.selected = this.users.find(
        //     data => data.id === Number(this.urlUserId)
        //   );
        //   if (!this.selected) {
        //     this.router.navigateByUrl('**');
        //   }
        // }
      },
      lifeIsBad => {
        console.error('Error in UserComponent.reloadUsers()');
        console.error(lifeIsBad);
      }
    );
  }

  removeUser() {
    this.loggedInUser = new User();
  }

  disableUser(user: User) {
    if ( user.enabled === false) {
      user.enabled = true;
    } else if ( user.enabled === true) {
      user.enabled = false;
    }
    this.userService.update(user.id, user).subscribe(
      () => {
        console.log('SUCCESS IN USER COMPONENT DISABLE USER');
      },
      err => {
        console.error('ERROR IN USER COMPONENET DISABLE USER');
        console.error(err);
      }

    );
  }

  disableProfile() {
    this.loggedInUser.enabled = false;
    this.userService.update(this.loggedInUser.id, this.loggedInUser).subscribe(
      () => {
        console.log('User has been updated with false for enabled');
      },
      err => {
        console.error('ERROR UPDATING FALSE FOR ENABLED');
        console.error(err);
      }
    );
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  redirectTool(toolRental) {
    this.router.navigateByUrl('/toolTransaction?id=' + toolRental.tool.id);
  }
  // TODO we dont need this but could utilize in a different way.

  // checkTotalUsers(): string {
  //   let classColor = '';
  //   if (this.showTotalUsers() >= 10) {
  //     classColor = 'badge badge-pill badge-danger';
  //   } else if (this.showTotalUsers() >= 5) {
  //     classColor = 'badge badge-pill badge-warning';
  //   } else if (this.showTotalUsers() < 5) {
  //     classColor = 'badge badge-pill badge-success';
  //   }
  //   return classColor;
  // }
}
