import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Day } from '../interfaces/day';
import { Days } from '../interfaces/days';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  public getDays(): Observable<Days> {
    return this.http
      .get<Days>(this.URL + `days`)
      .pipe(map((resp: Days) => resp));
  }

  public getDaysByEmployee(id: number): Observable<Days> {
    return this.http
      .get<Days>(this.URL + `days/employee/${id}`)
      .pipe(map((resp: Days) => resp));
  }

  public getDayById(id: number): Observable<Day> {
    return this.http
      .get<Day>(this.URL + `days/${id}`)
      .pipe(map((resp: Day) => resp));
  }

  public deleteDays(id: number): Observable<Day> {
    return this.http.delete<Day>(this.URL + `days/${id}`, {
      headers: this.headers,
    });
  }

  public updateDay(id: number, data: FormGroup): Observable<Day> {
    return this.http.patch<Day>(this.URL + `days/${id}`, data, {
      headers: this.headers,
    });
  }

  public createDay(data: FormGroup): Observable<Day> {
    return this.http.post<Day>(this.URL + `days`, data, {
      headers: this.headers,
    });
  }
}
