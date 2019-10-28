import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { ReviewOfLender } from '../models/review-of-lender';

@Injectable({
  providedIn: 'root'
})
export class ReviewOfLenderService {
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
    return this.http.get<ReviewOfLender>(this.url + TRid + '/reviewOfLender', httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in ReviewOfLenderService.index()');
      })
      );
    }

  create(TRid: number, reviewOfLender: ReviewOfLender) {
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
      return this.http.post(this.url + TRid + '/reviewOfLender', reviewOfLender, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new review of lender in reviewOfLender.create()');
      })
      );
    }

    update(TRid: number, ROLid: number, reviewOfLender: ReviewOfLender) {
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
      return this.http.put(this.url + TRid + '/reviewOfLender/' + ROLid, reviewOfLender, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing a review of lender');
      })
      );
  }

  destroy(TRid: number, ROLid: number) {
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
    return this.http.delete(this.url + TRid + '/reviewOfLender/' + ROLid, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting a review of lender in ReviewOfLender.service.ts');
      })
      );
    }
  }
