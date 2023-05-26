import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dates } from 'src/app/shared/interfaces/dates';
import { User } from 'src/app/shared/interfaces/user';
import { DateService } from 'src/app/shared/services/date.service';
import { LoginService } from 'src/app/shared/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.css'],
})
export class ListadoCitasComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private dateService: DateService
  ) {}

  public dates: Dates;
  public user: User;

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
      this.getDatesByUser(this.user);
    });
  }

  public getDatesByUser(user: User) {
    this.dateService.getDatesByUser(user.data.id).subscribe((dates) => {
      this.dates = dates;
    });
  }

  public delete(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar la cita ${id}`,
      text: `Se enviará una solicitud al administrador para que lo revise`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dateService.getDateById(id).subscribe((date) => {
          this.dateService
            .solicitudEliminarCita(
              this.user.data.name,
              id,
              this.user.data.email
            )
            .subscribe(() => {});
          Swal.fire(
            'Solicitud enviada correctamente al administrador',
            '',
            'success'
          );
        });
      }
    });
  }

  public update(id: number): void {
    this.router.navigate([`user/citas/editar/${id}`]);
  }
}
