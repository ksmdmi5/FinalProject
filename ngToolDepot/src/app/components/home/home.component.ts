import { AuthService } from './../../services/auth.service';
import { ToolService } from 'src/app/services/tool.service';
import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/models/tool';
import { RegisterComponent } from '../register/register.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searched = false;
  searchTerm: string = '';
  searchResults: Tool[] = [];
  constructor(
    private toolService: ToolService,
    private registerComp: RegisterComponent,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  search() {
    return this.toolService.search(this.searchTerm).subscribe (
      data => {
        this.searchResults = data;
      },
      err => {
        console.error('Error in home.component - search');
        console.error(err);
      }
    )
  }

  register(form: NgForm) {
    this.registerComp.register(form);
  }

  checkLoggedInUser(): boolean {
    if (this.authService.checkLogin()) {
      return true;
    } else {
      return false;
    }
  }

}
