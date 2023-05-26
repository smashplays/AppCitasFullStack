import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from 'src/app/shared/interfaces/employees';
import { DayService } from 'src/app/shared/services/day.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-fecha',
  templateUrl: './generar-fecha.component.html',
  styleUrls: ['./generar-fecha.component.css'],
})
export class GenerarFechaComponent implements OnInit {
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private dayService: DayService
  ) {}

  public employees: Employees;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
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

  public crear(): void {
    this.dayService.createDay(this.fechaForm.value).subscribe(() => {
      Swal.fire('Fecha creada correctamente', '', 'success').then(() => {
        this.router.navigate(['admin/fechas']);
      });
    });
  }
}
