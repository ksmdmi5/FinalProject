import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './../register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public navbarCollapse = true;

  user: User = new User();

  constructor(private auth: AuthService,
              private registerComp: RegisterComponent,
              private loginComp: LoginComponent) { }


  ngOnInit() {
  }

  checkIfLoggedInUser(): boolean {
    return this.auth.checkLogin();
  }

  // getUsername(): User {
  //   return JSON.parse(localStorage.getItem('Object'));
  // }
  getUserFName(): string {
    return localStorage.getItem('userFName');
  }

  register(form: NgForm) {
    this.registerComp.register(form);
  }

  login(form: NgForm) {
    this.loginComp.login(form);
  }

}

