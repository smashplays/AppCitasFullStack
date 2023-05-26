import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Hour } from '../interfaces/hour';
import { Hours } from '../interfaces/hours';

@Injectable({
  providedIn: 'root',
})
export class HourService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  public getHours(): Observable<Hours> {
    return this.http
      .get<Hours>(this.URL + `hours`)
      .pipe(map((resp: Hours) => resp));
  }

  public getHoursByDay(id: number): Observable<Hours> {
    return this.http
      .get<Hours>(this.URL + `hours/day/${id}`)
      .pipe(map((resp: Hours) => resp));
  }

  public getHourById(id: number): Observable<Hour> {
    return this.http
      .get<Hour>(this.URL + `hours/${id}`)
      .pipe(map((resp: Hour) => resp));
  }

  public deleteHours(id: number): Observable<Hour> {
    return this.http.delete<Hour>(this.URL + `hours/${id}`, {
      headers: this.headers,
    });
  }

  public updateHour(id: number, data: FormGroup): Observable<Hour> {
    return this.http.patch<Hour>(this.URL + `hours/${id}`, data, {
      headers: this.headers,
    });
  }

  public createHour(data: FormGroup): Observable<Hour> {
    return this.http.post<Hour>(this.URL + `hours`, data, {
      headers: this.headers,
    });
  }
}
