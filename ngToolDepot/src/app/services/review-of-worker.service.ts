import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { ReviewOfWorker } from '../models/review-of-worker';

@Injectable({
  providedIn: 'root'
})
export class ReviewOfWorkerService {
  private url = environment.baseUrl + 'api/reviewOfWorker';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  index() {
    if (localStorage.length === 0) {
      this.router.navigateByUrl('/login');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ` + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<ReviewOfWorker[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in ReviewOfWorkerService.index()');
      })
      );
    }

  create(reviewOfWorker: ReviewOfWorker) {
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
      return this.http.post(this.url, reviewOfWorker, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new review of worker in reviewOfWorker.Service.create()');
      })
      );
    }

    update(id: number, reviewOfWorker: ReviewOfWorker) {
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
      return this.http.put(this.url + '/' + id, reviewOfWorker, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing an review of worker in reviewOfWorker.service.ts');
      })
      );
  }

  destroy(id: number) {
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
    return this.http.delete(this.url + '/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting a review of worker in reviewOfWorker.service.ts');
      })
      );
    }
  }
