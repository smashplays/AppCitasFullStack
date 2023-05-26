import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/interfaces/employee';
import { Employees } from 'src/app/shared/interfaces/employees';
import { Service } from 'src/app/shared/interfaces/service';
import { Services } from 'src/app/shared/interfaces/services';
import { DayService } from 'src/app/shared/services/day.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { HourService } from 'src/app/shared/services/hour.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Hours } from 'src/app/shared/interfaces/hours';
import { Hour } from 'src/app/shared/interfaces/hour';
import { Day } from 'src/app/shared/interfaces/day';
import { Days } from 'src/app/shared/interfaces/days';
import { LoginService } from 'src/app/shared/services/login.service';
import { User } from 'src/app/shared/interfaces/user';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/services/date.service';
import { EMPTY, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.css'],
})
export class FormularioCitaComponent implements OnInit {
  public empleados: Employees; // Lista de empleados
  public servicios: Services;
  public fechasDisponibles: Days; // Lista de fechas disponibles
  public horasDisponibles: Hours; // Lista de horas disponibles

  public servicioSeleccionado: number = null; // Servicio seleccionado
  public empleadoSeleccionado: number = null; // Empleado seleccionado
  public fechaSeleccionada: number = null; // Fecha seleccionada
  public horaSeleccionada: number = null; // Hora seleccionada

  public servicioCopia: Service;
  public empleadoCopia: Employee;
  public fechaCopia: Day;
  public horaCopia: Hour;

  public errorService: boolean = false;
  public errorEmployee: boolean = false;
  public errorDate: boolean = false;
  public errorHour: boolean = false;

  public progresoSeleccion: number = 0;
  public user: User;

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private employeeService: EmployeeService,
    private dayService: DayService,
    private hourService: HourService,
    private loginService: LoginService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
      this.obtenerServicios();
    });
  }

  obtenerServicios() {
    this.serviceService
      .getServices()
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.errorService = true;
          }
          return EMPTY;
        })
      )
      .subscribe((services) => {
        this.servicios = services;
        this.errorService = false;
      });
  }

  cambiarServicioSeleccionado() {
    this.progresoSeleccion = 1;
    this.employeeService
      .getEmployees()
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.errorEmployee = true;
          }
          return EMPTY;
        })
      )
      .subscribe((empleados) => {
        this.serviceService
          .getServiceById(this.servicioSeleccionado)
          .subscribe((servicio) => {
            this.servicioCopia = servicio;
          });
        this.empleados = empleados;
        this.errorEmployee = false;

        this.empleadoSeleccionado = null;
        this.fechaSeleccionada = null;
        this.horaSeleccionada = null;
      });
  }

  cambiarEmpleadoSeleccionado(employee: string) {
    this.progresoSeleccion = 2;
    this.dayService
      .getDaysByEmployee(+employee)
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.errorDate = true;
          }
          return EMPTY;
        })
      )
      .subscribe((days) => {
        this.employeeService
          .getEmployeeById(this.empleadoSeleccionado)
          .subscribe((empleado) => {
            this.empleadoCopia = empleado;
          });

        this.errorDate = false;
        this.fechasDisponibles = days;
        this.fechaSeleccionada = null;
        this.horaSeleccionada = null;
      });
  }

  cambiarFechaSeleccionada(day: string) {
    this.progresoSeleccion = 3;
    this.hourService
      .getHoursByDay(+day)
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.errorHour = true;
          }
          return EMPTY;
        })
      )
      .subscribe((horas) => {
        this.dayService
          .getDayById(this.fechaSeleccionada)
          .subscribe((fecha) => {
            this.fechaCopia = fecha;
          });
        this.errorHour = false;
        this.horasDisponibles = horas;
        this.horaSeleccionada = null;
      });
  }

  cambiarHoraSeleccionada() {
    this.progresoSeleccion = 4;
    this.hourService.getHourById(this.horaSeleccionada).subscribe((hora) => {
      this.horaCopia = hora;
    });
  }

  pedirCita() {
    Swal.fire({
      title: `¿Quieres pedir cita para ${this.servicioCopia.data.name}, por el empleado ${this.empleadoCopia.data.name} el día ${this.fechaCopia.data.name} a las ${this.horaCopia.data.name}?`,
      text: `Recibirás una confirmación a tu correo ${this.user.data.email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar cita',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dateService
          .createDate(
            this.servicioCopia.data.id,
            this.empleadoCopia.data.id,
            this.fechaCopia.data.name,
            this.horaCopia.data.name,
            this.user.data.id
          )
          .subscribe(() => {
            this.dateService
              .citaPedidaCliente(
                this.user.data.name,
                this.servicioCopia.data.name,
                this.empleadoCopia.data.name,
                this.fechaCopia.data.name,
                this.horaCopia.data.name,
                this.user.data.email
              )
              .subscribe(() => {});
            this.dateService
              .citaPedidaAdmin(
                this.user.data.name,
                this.servicioCopia.data.name,
                this.empleadoCopia.data.name,
                this.fechaCopia.data.name,
                this.horaCopia.data.name,
                this.user.data.email
              )
              .subscribe(() => {});
            this.hourService
              .deleteHours(this.horaCopia.data.id)
              .subscribe(() => {
                this.dayService
                  .getDayById(this.fechaCopia.data.id)
                  .subscribe((day) => {
                    if (day.data.hours.length <= 0) {
                      this.dayService
                        .deleteDays(this.fechaCopia.data.id)
                        .subscribe(() => {
                          Swal.fire(
                            'Cita creada correctamente',
                            '',
                            'success'
                          ).then(() => {
                            this.router.navigate(['user/citas']);
                          });
                        });
                    }
                    Swal.fire('Cita creada correctamente', '', 'success').then(
                      () => {
                        this.router.navigate(['user/citas']);
                      }
                    );
                  });
              });
          });
      }
    });
  }
}
