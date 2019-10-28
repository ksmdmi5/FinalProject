import { User } from 'src/app/models/user';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  @Input() user: User;
  private url = environment.baseUrl + 'api/user';
  userToBeUpdated: User = new User();


  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
  }

  getUser() {
    this.http.get<User>(this.url + '/' + this.user.id).subscribe(
      data => {
        this.userToBeUpdated = data;
      },
      err => {
        console.error('Error in update-user - getUser()');
        console.error(err);
      }
    );
  }

  updateUser() {
    console.log(this.userToBeUpdated);
    console.log(this.user.id);
    this.userService.update(this.user.id, this.userToBeUpdated).subscribe(
      () => {
        console.log('Success editing User');
        location.reload();
      },
      err => {
        console.error('Error in update-user - updateUser');
        console.error(err);
      }
    );
  }

}
