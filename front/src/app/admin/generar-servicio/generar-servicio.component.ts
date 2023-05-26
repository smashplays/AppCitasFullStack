import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-generar-servicio',
  templateUrl: './generar-servicio.component.html',
  styleUrls: ['./generar-servicio.component.css'],
})
export class GenerarServicioComponent {
  constructor(private router: Router, private serviceService: ServiceService) {}

  public serviceForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.serviceForm.invalid;
  }

  public crear(): void {
    this.serviceService.createService(this.serviceForm.value).subscribe(() => {
      Swal.fire('Servicio creado correctamente', '', 'success').then(() => {
        this.router.navigate(['admin/servicios']);
      });
    });
  }
}
