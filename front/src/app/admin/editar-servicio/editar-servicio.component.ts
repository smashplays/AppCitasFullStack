import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';
import { Service } from '../../shared/interfaces/service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css'],
})
export class EditarServicioComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  public service: Service;

  ngOnInit(): void {
    this.paramMapSubscription();
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.serviceService
        .getServiceById(+params.get('id'))
        .subscribe((response) => {
          this.service = response;
        });
    });
  }

  public serviceForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.serviceForm.invalid;
  }

  public editar(): void {
    Swal.fire({
      title: `¿Quieres actualizar el servicio con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService
          .updateService(this.service.data.id, this.serviceForm.value)
          .pipe(
            catchError((err) => {
              if (err.status === 500) {
                Swal.fire(
                  `El servicio que has introducido no existe`,
                  '',
                  'error'
                );
              }
              return EMPTY;
            })
          )
          .subscribe(() => {
            Swal.fire(`Servicio actualizado correctamente`, '', 'success').then(
              () => {
                this.router.navigate(['admin/servicios']);
              }
            );
          });
      }
    });
  }
}
