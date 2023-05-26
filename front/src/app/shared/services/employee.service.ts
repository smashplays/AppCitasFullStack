import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Employee } from '../interfaces/employee';
import { Employees } from '../interfaces/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  public getEmployees(): Observable<Employees> {
    return this.http
      .get<Employees>(this.URL + `employees`)
      .pipe(map((resp: Employees) => resp));
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.http
      .get<Employee>(this.URL + `employees/${id}`)
      .pipe(map((resp: Employee) => resp));
  }

  public deleteEmployees(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.URL + `employees/${id}`, {
      headers: this.headers,
    });
  }

  public updateEmployee(id: number, data: FormGroup): Observable<Employee> {
    return this.http.patch<Employee>(this.URL + `employees/${id}`, data, {
      headers: this.headers,
    });
  }

  public createEmployee(data: FormGroup): Observable<Employee> {
    return this.http.post<Employee>(this.URL + `employees`, data, {
      headers: this.headers,
    });
  }
}
