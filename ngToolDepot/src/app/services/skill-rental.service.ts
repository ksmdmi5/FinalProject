import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { SkillRental } from '../models/skill-rental';

@Injectable({
  providedIn: 'root'
})
export class SkillRentalService {
  private url = environment.baseUrl + 'api/skillRental';

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
    return this.http.get<SkillRental[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in SkillRentalService.index()');
      })
      );
    }

  create(skillRental: SkillRental) {
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
      return this.http.post(this.url, skillRental, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new skill rental in skillRental.Service.create()');
      })
      );
    }

    update(id: number, skillRental: SkillRental) {
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
      return this.http.put(this.url + '/' + id, skillRental, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing an skill rental in SkillRental.service.ts');
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
        return throwError('Error deleting a skill rental in skillRental.service.ts');
      })
      );
    }
  }
