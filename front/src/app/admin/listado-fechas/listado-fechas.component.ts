import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Days } from 'src/app/shared/interfaces/days';
import { DayService } from 'src/app/shared/services/day.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-fechas',
  templateUrl: './listado-fechas.component.html',
  styleUrls: ['./listado-fechas.component.css'],
})
export class ListadoFechasComponent {
  constructor(private dayService: DayService, private router: Router) {}

  public days: Days;

  ngOnInit(): void {
    this.getDays();
  }

  public getDays(): void {
    this.dayService.getDays().subscribe((days) => {
      this.days = days;
    });
  }

  public delete(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar el día ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dayService.deleteDays(id).subscribe(() => {
          this.getDays();
          Swal.fire(`Día ${id} eliminado correctamente`, '', 'success');
        });
      }
    });
  }

  public update(id: number): void {
    this.router.navigate([`admin/fechas/editar/${id}`]);
  }

  public create(): void {
    this.router.navigate(['admin/fechas/generar']);
  }
}
