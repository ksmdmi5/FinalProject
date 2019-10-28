import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl + 'api/user';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  index() {
    if (localStorage.length === 0) {
      this.router.navigateByUrl('/login');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ` + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<User[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in UserService.index()');
      })
      );
    }

    create(user: User) {
      if (localStorage.length === 0) {
        this.router.navigateByUrl('/login');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Basic ` + this.authService.getCredentials(),
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
    };
      return this.http.post(environment.baseUrl + '/register', user, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new user in userService.create()');
      })
      );
    }

    update(id: number, user: User) {
      if (localStorage.length === 0) {
        this.router.navigateByUrl('/login');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Basic ` + this.authService.getCredentials(),
          'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
        // Authorization: 'my-auth-token'
      })
    };
      return this.http.put(this.url + '/' + id, user, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing a user in user.service.ts.update()');
      })
      );
  }
  // getUserByUsername() {
  //   if (localStorage.length === 0) {
  //     this.router.navigateByUrl('/login');
  //   }
  //   const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Authorization: `Basic ` + this.authService.getCredentials(),
  //         'X-Requested-With': 'XMLHttpRequest'
  //         // Authorization: 'my-auth-token'
  //       })
  //     };

  //   console.log(localStorage.getItem('user') + '   SECOND ()()()()()()()()()())()^^&');
    // return this.http.get<User>(this.url + '/' + localStorage.getItem('user'), httpOptions).pipe(
    //   catchError((err: any) => {
    //     console.log(err);
    //     return throwError('Error in user service -- getUserbyUsername');
    //   })
    // );
  // }

  destroy(id: number) {
    if (localStorage.length === 0) {
      this.router.navigateByUrl('/login');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ` + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
        // Authorization: 'my-auth-token'
      })
    };
    return this.http.delete(this.url + '/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting a user in user.service.ts.destroy()');
      })
      );
    }


  }
