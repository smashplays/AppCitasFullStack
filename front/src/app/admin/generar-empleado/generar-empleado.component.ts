import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-empleado',
  templateUrl: './generar-empleado.component.html',
  styleUrls: ['./generar-empleado.component.css'],
})
export class GenerarEmpleadoComponent {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  public employeeForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.employeeForm.invalid;
  }

  public crear(): void {
    this.employeeService
      .createEmployee(this.employeeForm.value)
      .subscribe(() => {
        Swal.fire('Empleado creado correctamente', '', 'success').then(() => {
          this.router.navigate(['admin/empleados']);
        });
      });
  }
}
