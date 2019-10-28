import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = environment.baseUrl + 'api/address';

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
    return this.http.get<Address[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in AddressService.index()');
      })
      );
    }

  create(address: Address) {
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
      return this.http.post(this.url, address, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new Address in AddressService.create()');
      })
      );
    }

    update(id: number, address: Address) {
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
      return this.http.put(this.url + '/' + id, address, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing an Address');
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
        return throwError('Error deleting a Address in address.service.ts');
      })
      );
    }
    getAddressOfToolOwner(toolId: number) {
      return this.http.get<Address>(environment.baseUrl + 'api/tool/' + toolId + '/address').pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error retrieving a Address in address.service.ts');
        })
      );
    }
  }
