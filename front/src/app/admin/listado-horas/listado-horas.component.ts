import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Hours } from '../../shared/interfaces/hours';
import { HourService } from 'src/app/shared/services/hour.service';

@Component({
  selector: 'app-listado-horas',
  templateUrl: './listado-horas.component.html',
  styleUrls: ['./listado-horas.component.css'],
})
export class ListadoHorasComponent {
  constructor(private hourService: HourService, private router: Router) {}

  public hours: Hours;

  ngOnInit(): void {
    this.getHours();
  }

  public getHours(): void {
    this.hourService.getHours().subscribe((hours) => {
      this.hours = hours;
    });
  }

  public delete(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar la hora ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hourService.deleteHours(id).subscribe(() => {
          this.getHours();
          Swal.fire(`Hora ${id} eliminada correctamente`, '', 'success');
        });
      }
    });
  }

  public update(id: number): void {
    this.router.navigate([`admin/horas/editar/${id}`]);
  }

  public create(): void {
    this.router.navigate(['admin/horas/generar']);
  }
}
