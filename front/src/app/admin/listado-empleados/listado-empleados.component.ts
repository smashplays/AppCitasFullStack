import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employees } from 'src/app/shared/interfaces/employees';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css'],
})
export class ListadoEmpleadosComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  public employees: Employees;

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  public delete(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar el empleado ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployees(id).subscribe(() => {
          this.getEmployees();
          Swal.fire(`Empleado ${id} eliminado correctamente`, '', 'success');
        });
      }
    });
  }

  public update(id: number): void {
    this.router.navigate([`admin/empleados/editar/${id}`]);
  }

  public create(): void {
    this.router.navigate(['admin/empleados/generar']);
  }
}
