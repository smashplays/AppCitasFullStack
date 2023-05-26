import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Service } from '../interfaces/service';
import { Services } from '../interfaces/services';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  public getServices(): Observable<Services> {
    return this.http
      .get<Services>(this.URL + `services`)
      .pipe(map((resp: Services) => resp));
  }

  public getServiceById(id: number): Observable<Service> {
    return this.http
      .get<Service>(this.URL + `services/${id}`)
      .pipe(map((resp: Service) => resp));
  }

  public deleteServices(id: number): Observable<Service> {
    return this.http.delete<Service>(this.URL + `services/${id}`, {
      headers: this.headers,
    });
  }

  public updateService(id: number, data: FormGroup): Observable<Service> {
    return this.http.patch<Service>(this.URL + `services/${id}`, data, {
      headers: this.headers,
    });
  }

  public createService(data: FormGroup): Observable<Service> {
    return this.http.post<Service>(this.URL + `services`, data, {
      headers: this.headers,
    });
  }
}
