import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.usuario = user;
    });
  }

  public usuario: User;

  public logout(): void {
    if (localStorage.getItem('token')) {
      this.loginService.logout().subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('token');
          this.usuario = null;
          this.router.navigate(['auth/login']);
        }
      });
    } else {
      console.log('No estas logeado');
    }
  }
}
