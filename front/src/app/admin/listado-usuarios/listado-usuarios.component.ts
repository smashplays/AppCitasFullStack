import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { Users } from 'src/app/shared/interfaces/users';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
})
export class ListadoUsuariosComponent implements OnInit {
  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {}

  public users: Users;
  public usuario: User;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.loginService.me().subscribe((user) => {
        this.usuario = user;
      });
    });
  }

  public delete(id: number): void {
    Swal.fire(`Eliminando ${id}...`);
  }

  public update(id: number): void {
    Swal.fire(`Actualizando ${id}...`);
  }
}
