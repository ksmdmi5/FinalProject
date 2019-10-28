import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { ReviewOfRenter } from '../models/review-of-renter';

@Injectable({
  providedIn: 'root'
})
export class ReviewOfRenterService {
  private url = environment.baseUrl + 'api/toolRental/';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  index(TRid: number) {
    if (localStorage.length === 0) {
      this.router.navigateByUrl('/login');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ` + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<ReviewOfRenter>(this.url + TRid + '/reviewOfRenter', httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in ReviewOfRenterService.index()');
      })
      );
    }

  create(TRid: number, reviewOfRenter: ReviewOfRenter) {
      if (localStorage.length === 0) {
        this.router.navigateByUrl('/login');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ` + this.authService.getCredentials(),
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
    };
      return this.http.post(this.url + TRid + '/reviewOfRenter', reviewOfRenter, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new review of renter in ReviewOfRenterService.create()');
      })
      );
    }

    update(TRid: number, RORid: number, reviewOfRenter: ReviewOfRenter) {
      if (localStorage.length === 0) {
        this.router.navigateByUrl('/login');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ` + this.authService.getCredentials(),
          'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
        // Authorization: 'my-auth-token'
      })
    };
      return this.http.put(this.url + TRid + '/reviewOfRenter/' + RORid, reviewOfRenter, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing a review of renter in reviewOfRenter.service.ts');
      })
      );
  }

  destroy(TRid: number, RORid: number) {
    if (localStorage.length === 0) {
      this.router.navigateByUrl('/login');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ` + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
        // Authorization: 'my-auth-token'
      })
    };
    return this.http.delete(this.url + TRid + '/reviewOfRenter/' + RORid, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting a review of renter in reviewOfRenter.service.ts');
      })
      );
    }
  }
