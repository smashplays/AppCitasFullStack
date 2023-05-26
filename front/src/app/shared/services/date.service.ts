import { Date } from './../interfaces/date';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Dates } from '../interfaces/dates';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  public getDates(): Observable<Dates> {
    return this.http
      .get<Dates>(this.URL + `dates`)
      .pipe(map((resp: Dates) => resp));
  }

  public getDatesByUser(id: number): Observable<Dates> {
    return this.http
      .get<Dates>(this.URL + `dates/user/${id}`)
      .pipe(map((resp: Dates) => resp));
  }

  public getDateById(id: number): Observable<Date> {
    return this.http
      .get<Date>(this.URL + `dates/${id}`)
      .pipe(map((resp: Date) => resp));
  }

  public deleteDates(id: number): Observable<Date> {
    return this.http.delete<Date>(this.URL + `dates/${id}`, {
      headers: this.headers,
    });
  }

  public updateDate(id: number, data: FormGroup): Observable<Date> {
    return this.http.patch<Date>(this.URL + `dates/${id}`, data, {
      headers: this.headers,
    });
  }

  public createDate(
    service: number,
    employee: number,
    day: string,
    hour: string,
    client: number
  ): Observable<Date> {
    let data = {
      service_id: service,
      employee_id: employee,
      time: day.split('-').reverse().join('-') + 'T' + hour + ':00.000000Z',
      user_id: client,
    };
    return this.http.post<Date>(this.URL + `dates`, data, {
      headers: this.headers,
    });
  }

  public citaPedidaCliente(
    user: string,
    service: string,
    employee: string,
    day: string,
    hour: string,
    email: string
  ): Observable<any> {
    let data = {
      user: user,
      service: service,
      employee: employee,
      day: day,
      hour: hour,
      email: email,
    };

    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http
      .post<any>(this.URL + 'cita-pedida-cliente', data, {
        headers: headers,
      })
      .pipe(map((resp: any) => resp));
  }

  public citaPedidaAdmin(
    user: string,
    service: string,
    employee: string,
    day: string,
    hour: string,
    email: string
  ): Observable<any> {
    let data = {
      user: user,
      service: service,
      employee: employee,
      day: day,
      hour: hour,
      email: email,
    };

    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http
      .post<any>(this.URL + 'cita-pedida-admin', data, {
        headers: headers,
      })
      .pipe(map((resp: any) => resp));
  }

  public solicitudEliminarCita(
    user: string,
    date: number,
    email: string
  ): Observable<any> {
    let data = {
      user: user,
      date: date,
      email: email,
    };

    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http
      .post<any>(this.URL + 'solicitud-eliminar-cita', data, {
        headers: headers,
      })
      .pipe(map((resp: any) => resp));
  }

  public confirmacionCitaEliminada(
    user: string,
    date: number,
    email: string
  ): Observable<any> {
    let data = {
      user: user,
      date: date,
      email: email,
    };
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http
      .post<any>(this.URL + 'confirmacion-cita-eliminada', data, {
        headers: headers,
      })
      .pipe(map((resp: any) => resp));
  }
}
