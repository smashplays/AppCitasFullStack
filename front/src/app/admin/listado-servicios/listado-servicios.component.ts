import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Services } from '../../shared/interfaces/services';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-listado-servicios',
  templateUrl: './listado-servicios.component.html',
  styleUrls: ['./listado-servicios.component.css'],
})
export class ListadoServiciosComponent implements OnInit {
  constructor(private serviceService: ServiceService, private router: Router) {}

  public services: Services;

  ngOnInit(): void {
    this.getServices();
  }

  public getServices(): void {
    this.serviceService.getServices().subscribe((services) => {
      this.services = services;
    });
  }

  public delete(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar el servicio ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.deleteServices(id).subscribe(() => {
          this.getServices();
          Swal.fire(`Servicio ${id} eliminado correctamente`, '', 'success');
        });
      }
    });
  }

  public update(id: number): void {
    this.router.navigate([`admin/servicios/editar/${id}`]);
  }

  public create(): void {
    this.router.navigate(['admin/servicios/generar']);
  }
}
