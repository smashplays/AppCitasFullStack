import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { LoginService } from 'src/app/shared/services/login.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configurar-usuario',
  templateUrl: './configurar-usuario.component.html',
  styleUrls: ['./configurar-usuario.component.css'],
})
export class ConfigurarUsuarioComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  public user: User;

  public passwordMatch: boolean;

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
    });
  }

  public validateForm(): boolean {
    return this.userForm.invalid;
  }

  public userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rpassword: new FormControl(null, [Validators.required]),
    role: new FormControl('user'),
  });

  public updateUser(): void {
    Swal.fire({
      title: `¿Quieres actualizar el usuario con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          this.userForm.get('password').value !==
          this.userForm.get('rpassword').value
        ) {
          this.passwordMatch = true;
        } else if (
          this.userForm.get('role').value.toLowerCase() === 'admin' ||
          this.userForm.get('role').value.toLowerCase() === 'user'
        ) {
          this.passwordMatch = false;
          this.userService
            .updateUser(this.user.data.id, this.userForm.value)
            .subscribe(() => {
              Swal.fire(`Usuario actualizado correctamente`, '', 'success');
            });
        } else {
          this.passwordMatch = false;
        }
      }
    });
  }
}
