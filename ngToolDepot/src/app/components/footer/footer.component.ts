import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private auth: AuthService,
              private registerComp: RegisterComponent) { }

  ngOnInit() {
  }
  checkIfLoggedInUser(): boolean {
    return this.auth.checkLogin();
  }

  getUsername(): string{
    return this.auth.getUsername();
  }

  register(form: NgForm) {
    this.registerComp.register(form);
  }
}
