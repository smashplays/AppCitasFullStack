import { Respuesta } from './../../shared/interfaces/login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private loginservice: LoginService,
    private createService: LoginService
  ) {}

  passwordMatch: boolean;

  userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rpassword: new FormControl(null, [Validators.required]),
    role: new FormControl('user'),
  });

  validateForm(): boolean {
    return this.userForm.invalid;
  }

  ngOnInit(): void {
    this.loginservice.auth().subscribe((res) => {
      if (res) {
        this.router.navigate(['admin/config']);
      }
    });
  }

  register(): void {
    if (
      this.userForm.get('password').value ===
      this.userForm.get('rpassword').value
    ) {
      this.createService
        .register(this.userForm.value)
        .pipe(
          tap((res: Respuesta) => {
            if (res.success) {
              localStorage.setItem('token', res.data);
              this.router.navigate(['date/formulario']);
            }
          })
        )
        .subscribe();
    } else {
      this.passwordMatch = true;
    }
  }
}
