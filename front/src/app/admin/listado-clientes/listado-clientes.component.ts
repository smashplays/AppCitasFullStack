import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dates } from 'src/app/shared/interfaces/dates';
import { DateService } from 'src/app/shared/services/date.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
})
export class ListadoClientesComponent implements OnInit {
  constructor(private dateService: DateService, private router: Router) {}

  public dates: Dates;

  ngOnInit(): void {
    this.getDates();
  }

  public getDates() {
    this.dateService.getDates().subscribe((dates) => {
      this.dates = dates;
    });
  }

  public delete(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar la cita ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dateService.getDateById(id).subscribe((date) => {
          this.dateService
            .confirmacionCitaEliminada(
              date.data.user.name,
              date.data.id,
              date.data.user.email
            )
            .subscribe(() => {});
          this.dateService.deleteDates(id).subscribe(() => {
            Swal.fire(`Cita ${id} eliminada correctamente`, '', 'success').then(
              () => {
                this.getDates();
              }
            );
          });
        });
      }
    });
  }

  public update(id: number): void {
    this.router.navigate([`admin/citas/editar/${id}`]);
  }
}
