import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Day } from 'src/app/shared/interfaces/day';
import { Employees } from 'src/app/shared/interfaces/employees';
import { DayService } from 'src/app/shared/services/day.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-fecha',
  templateUrl: './editar-fecha.component.html',
  styleUrls: ['./editar-fecha.component.css'],
})
export class EditarFechaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private dayService: DayService
  ) {}

  public employees: Employees;
  public day: Day;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.paramMapSubscription();
    });
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.dayService.getDayById(+params.get('id')).subscribe((response) => {
        this.day = response;
      });
    });
  }

  public fechaForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{2}\-\d{2}\-\d{4}$/),
    ]),
    employee_id: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.fechaForm.invalid;
  }

  public actualizar(): void {
    Swal.fire({
      title: `¿Quieres actualizar el día con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dayService
          .updateDay(this.day.data.id, this.fechaForm.value)
          .pipe(
            catchError((err) => {
              if (err.status === 500) {
                Swal.fire(`El día que has introducido no existe`, '', 'error');
              }
              return EMPTY;
            })
          )
          .subscribe(() => {
            Swal.fire(`Día actualizado correctamente`, '', 'success').then(
              () => {
                this.router.navigate(['admin/fechas']);
              }
            );
          });
      }
    });
  }
}
