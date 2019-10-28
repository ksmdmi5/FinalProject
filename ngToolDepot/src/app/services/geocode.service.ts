import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  key = "&key=AIzaSyAQWXrkW5JByvZhl8kjGHaCwSUMongsLng";
  constructor(
    private http: HttpClient
  ) { }

  geocodeAddress(addr: string) {
    return this.http.get(this.url + addr + this.key).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error searching for tools in tool.service.ts.search()");
      })
    );
  }
}
