import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Data } from 'src/app/shared/interfaces/login';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  public error: boolean = false;
  public mensaje: string;

  public name: string;
  public password: string;

  public userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.userForm.invalid;
  }

  ngOnInit(): void {
    this.loginService.auth().subscribe((res) => {
      if (res) {
        this.router.navigate(['admin/config']);
      }
    });
  }

  public login(): void {
    const data: Data = {
      name: this.name,
      password: this.password,
    };
    this.loginService
      .login(data)
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            console.log(err);
            this.error = !err.error.success;
            this.mensaje = err.error.message;
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          localStorage.setItem('token', res.data);
          this.router.navigate(['admin/config']);
        }
      });
  }
}
