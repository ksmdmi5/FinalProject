import { ToolRental } from './../models/tool-rental';
import { ReviewOfRenter } from './../models/review-of-renter';
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs/internal/observable/throwError";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ToolRentalService {
  private url = environment.baseUrl + "api/toolRental";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  index() {
    if (localStorage.length === 0) {
      this.router.navigateByUrl("/login");
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ` + this.authService.getCredentials(),
        "X-Requested-With": "XMLHttpRequest"
      })
    };
    return this.http.get<ToolRental[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error in ToolRentalService.index()");
      })
    );
  }
  getToolTransactionsByUserName(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ` + this.authService.getCredentials(),
        "X-Requested-With": "XMLHttpRequest"
      })
    };
    return this.http.get<ToolRental[]>(this.url + '/' + username, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in toolRentalService - getToolTransactionsBy User');
      })
    )
  }

  getToolTransactionsByTool(toolId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ` + this.authService.getCredentials(),
        "X-Requested-With": "XMLHttpRequest"
      })
    };
    return this.http.get<ToolRental[]>(environment.baseUrl + 'api/tool/' + toolId + '/toolRental', httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error in toolRentalService - getToolTransactionsBy User');
      })
    )

  }
  create(toolRental: ToolRental, toolId: number) {
    console.log("IN HERE");
    console.log(toolRental);
    console.log(toolId);
    console.log(this.url);
    if (localStorage.length === 0) {
      this.router.navigateByUrl("/login");
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ` + this.authService.getCredentials(),
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      })
    };
    return this.http
      .post<ToolRental>(this.url + "?toolId=" + toolId, toolRental, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            "Error posting new tool rental in toolRental.Service.create()"
          );
        })
      );
  }

  update(id: number, toolRental: ToolRental) {
    if (localStorage.length === 0) {
      this.router.navigateByUrl("/login");
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ` + this.authService.getCredentials(),
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
        // Authorization: 'my-auth-token'
      })
    };
    return this.http.put(this.url + "/" + id, toolRental, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          "Error editing an tool rental in toolRental.service.ts.update()"
        );
      })
    );
  }

  destroy(id: number) {
    if (localStorage.length === 0) {
      this.router.navigateByUrl("/login");
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Basic ` + this.authService.getCredentials(),
        "X-Requested-With": "XMLHttpRequest"
        // Authorization: 'my-auth-token'
      })
    };
    return this.http.delete(this.url + "/" + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          "Error deleting a tool rental in toolRental.service.ts.destory()"
        );
      })
    );
  }
  findById(newToolRentalId: number) {
    return this.http.get<ToolRental>(this.url + '/findId/' + newToolRentalId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error searching for tools in tool-rental.service.ts.findById()');
      })
    );
  }
}
