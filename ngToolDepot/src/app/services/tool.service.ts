import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { Tool } from '../models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private url = environment.baseUrl + 'api/tool';
  newTool: Tool = new Tool();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  index() {
    return this.http.get<Tool[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in ToolService.index()');
      })
    );
  }

  create(tool: Tool) {
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
    return this.http.post(this.url, tool, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error posting new Tool in ToolService.create()');
      })
    );
  }

  update(id: number, tool: Tool) {
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
    return this.http.put(this.url + '/' + id, tool, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error editing a tool in tool.service.ts.update()');
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
        Authorization: `Basic ` + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.delete(this.url + '/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting a tool in tool.service.ts.destroy()');
      })
    );
  }
  getToolListByUserName(username: string) {
    if (localStorage.length === 0) {
      this.router.navigateByUrl('/login');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ` + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Tool[]>(this.url + '/user/' + username, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in tool service - getToolListByUser');
      })
    );
  }
  search(searchTerm: string) {
    return this.http.get<Tool[]>(this.url + '/search/' + searchTerm).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error searching for tools in tool.service.ts.search()');
      })
    );
  }
  findById(toolId: string) {
    return this.http.get<Tool>(this.url + '/' + toolId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error searching for tools in tool.service.ts.findById()");
      })
    );
  }
}
