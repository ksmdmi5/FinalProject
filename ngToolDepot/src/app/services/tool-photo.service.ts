import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { ToolPhoto } from '../models/tool-photo';
import { Tool } from '../models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolPhotoService {
  private url = environment.baseUrl + 'api/tool';

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
    return this.http.get<ToolPhoto[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in ToolPhotoService.index()');
      })
      );
    }

  create(toolPhoto: ToolPhoto, tool: Tool) {
      console.log(tool.id);
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
      return this.http.post(this.url + '/' + tool.id + '/toolPhoto' , toolPhoto, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new tool photo in ToolPhotoService.create()');
      })
      );
    }

    update(id: number, toolPhoto: ToolPhoto) {
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
      return this.http.put(this.url + '/' + id, toolPhoto, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing an Tool Photo in ToolPhoto.service.ts.update()');
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
        return throwError('Error deleting a tool photo in toolPhoto.service.ts.destroy()');
      })
      );
    }

    getToolPhotos(id: Tool) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<ToolPhoto[]>(this.url + '/' + id + 'toolPhoto', httpOptions).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error in ToolPhotoService.index()');
        })
        );
    }
  }
