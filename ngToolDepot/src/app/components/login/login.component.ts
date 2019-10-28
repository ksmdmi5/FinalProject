import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFail = '';
  toolId:number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.toolId = parseInt(this.route.snapshot.queryParamMap.get('toolId'));
  }

  login(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe(
      lifeIsGood => {
        form.reset();
        if (this.toolId != 0) {
          this.router.navigateByUrl('/toolTransaction?id=' + this.toolId);
        }
      },
        error => {
          form.reset();
          this.loginFail = 'Something';
          console.log('Error in loginComponent.login()');
          console.log(error);
        }
    );
  }

}
