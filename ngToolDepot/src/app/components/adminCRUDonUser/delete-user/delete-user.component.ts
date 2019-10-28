import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  delete() {
    this.userService.destroy(this.user.id).subscribe(
      () => {
        console.log('Success deleting User');
        location.reload();
      },
      err => {
        console.error('delete-user - delete()');
        console.error(err);
      }
    );
  }

}
