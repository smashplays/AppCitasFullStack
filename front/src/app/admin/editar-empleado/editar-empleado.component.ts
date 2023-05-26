import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css'],
})
export class EditarEmpleadoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  public employee: Employee;

  ngOnInit(): void {
    this.paramMapSubscription();
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeService
        .getEmployeeById(+params.get('id'))
        .subscribe((response) => {
          this.employee = response;
        });
    });
  }

  public employeeForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.employeeForm.invalid;
  }

  public editar(): void {
    Swal.fire({
      title: `¿Quieres actualizar el empleado con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService
          .updateEmployee(this.employee.data.id, this.employeeForm.value)
          .pipe(
            catchError((err) => {
              if (err.status === 500) {
                Swal.fire(
                  `El empleado que has introducido no existe`,
                  '',
                  'error'
                );
              }
              return EMPTY;
            })
          )
          .subscribe(() => {
            Swal.fire(`Empleado actualizado correctamente`, '', 'success').then(
              () => {
                this.router.navigate(['admin/empleados']);
              }
            );
          });
      }
    });
  }
}
